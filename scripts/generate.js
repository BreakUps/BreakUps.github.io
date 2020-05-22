const path = require('path');
const fs = require('fs');

const DIRPATH = 'raw/posts';
const CATEGORYPATH = 'raw/category.json';
const WEBPATH = 'posts';
const WEBFILEPATH = 'index.html';
fs.readdir(DIRPATH, function (err, files) {
    if (err)
        return console.log(`Unable to read directory contents${err}`);
    const category = files.map(file => {
        const {
            mtime
        } = fs.statSync(`${DIRPATH}/${file}`);
        return {
            title: file.slice(0, -3),
            date: mtime
        };
    });
    category.sort((a, b) => a < b ? -1 : 1);
    const fileDateMap = JSON.parse(fs.readFileSync(CATEGORYPATH, 'utf-8')).reduce((pre, cur) => {
        const { title, date } = cur;
        pre.set(title, Date.parse(date));
        return pre;
    }, new Map());
    
    fs.writeFile(CATEGORYPATH, JSON.stringify(category), (err) => {
        if (err)
            console.log(err);
        console.log(`${CATEGORYPATH} generated!`);
    });
    category.forEach(post => {
        const { title } = post;
        const currentFileDate = fileDateMap.get(title);
        if(currentFileDate) {
            return;
        } 
        const webdirPath = `${WEBPATH}/${title}`;
        fs.mkdir(webdirPath, err => {
            if(err)
                console.log(err);
            fs.copyFile(WEBFILEPATH, `${webdirPath}/index.html`, err => {
                if(err)
                    console.log(err);
                console.log(`${webdirPath} generated!`);
            })
        })
    })
});