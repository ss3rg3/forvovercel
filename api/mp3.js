const got = (await import('got')).default;

export default async function handler(req, res) {
    const {key = undefined} = req.query;
    const {lang = 'zh'} = req.query;
    const {word = undefined} = req.query;

    if (!key) {
        return res.status(400).send("'key' must be defined")
    }
    if (!word) {
        return res.status(400).send("'word' must be defined")
    }

    const url = `https://apifree.forvo.com/key/${key}/format/json/action/word-pronunciations/word/${word}/language/${lang}`
    return await got(url)
        .then(response => {
            console.log(JSON.stringify(JSON.parse(response.body), null, 2))
            return res.status(200).json(getNewestItem(response.body));
        })
        .catch(error => {
            return res.status(400).send(`
                HTTP request failed, got ${error.response.statusCode}<br>
                ${error.response.body}
            `);
        });

};


function getNewestItem(data) {
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

    let items = data.items;
    items.sort((a, b) => new Date(b.addtime) - new Date(a.addtime)); // Sort the items array by the 'addtime' property in descending order
    return items[0];
}
