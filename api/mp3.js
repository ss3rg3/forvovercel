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
            // todo 404 on empty result
            console.log(JSON.stringify(JSON.parse(response.body), null, 2));
            const items = getNewestItem(response.body);
            if (items) {
                return res.status(200).json(items);
            }
            return res.status(404).json({});
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
    if (items.length === 0) {
        return null;
    }
    return {
        type: "audioSourceList",
        audioSources: [
            {
                name: items[0].word,
                url: items[0].pathmp3
            }
        ]
    };
}
