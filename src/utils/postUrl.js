export function getPostUrl(title, date) {
    return `${title}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function parsePostUrl(postUrl) {
    const [date, month, year, ...titleFragments] = postUrl.split('-').reverse();
    return {title: titleFragments.join('-'), date: `${year}-${month}-${date}`};
}
