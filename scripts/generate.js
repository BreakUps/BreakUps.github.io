const path = require('path');
const fs = require('fs');

const DIRPATH = 'raw/posts';
const CATEGORYPATH = 'raw/category.json';
const WEBPATH = 'posts';
const WEBFILEPATH = 'index.html';

function isSameDate(date1, date2) {
    return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
}

function getPostUrl(title, date) {
    return `${title}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}


fs.readdir(DIRPATH, function (err, files) {
    if (err) {
        return console.log(`Unable to read directory contents${err}`);
    }
    const category = files.map(file => {
        const {
            mtime
        } = fs.statSync(`${DIRPATH}/${file}`);
        return {
            title: file.slice(0, -3),
            date: mtime
        };
    });
    category.sort((a, b) => a.date > b.date ? -1 : 1);
    const fileDateMap = new Map();
    try {
        JSON.parse(fs.readFileSync(CATEGORYPATH, 'utf-8')).forEach(post => {
            const { title, date } = post;
            fileDateMap.set(title, new Date(date));
        });
    }
    catch(e) {
        
    }
    
    fs.writeFile(CATEGORYPATH, JSON.stringify(category), (err) => {
        if(err) {
            console.log(err);
            return;
        }
        console.log(`${CATEGORYPATH} generated!`);
    });
    const { mtime: webFileMTime } = fs.statSync(WEBFILEPATH);
    category.forEach(post => {
        const { title, date } = post, newUrl = getPostUrl(title, date), newWebdirPath = `${WEBPATH}/${newUrl}`;
        const currentFileDate = fileDateMap.get(title);
        fileDateMap.delete(title);
        if(currentFileDate) {
            if(!isSameDate(currentFileDate, date)) {
                const oldUrl = getPostUrl(title, currentFileDate);
                fs.renameSync(`${WEBPATH}/${oldUrl}`, newWebdirPath);
            }
            // return;
        }
        fs.mkdir(newWebdirPath, err => {
            if(err && err.code !== 'EEXIST') {
                console.log(err);
                return;
            }
            if(fs.statSync(`${newWebdirPath}/index.html`)?.mtime === webFileMTime) {
                // Already is latest 'index.html'
                return;
            }
            fs.copyFile(WEBFILEPATH, `${newWebdirPath}/index.html`, err => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log(`${newWebdirPath} generated!`);
            })
        });
    });
    for(const [title, date] of fileDateMap) {
        const webDirPath = `${WEBPATH}/${getPostUrl(title, date)}`;
        fs.rmdir(webDirPath, err => {
            if(err) {
                console.log(err);
                return;
            }
            console.log(`${webDirPath} removed!`);
        })
    }
});