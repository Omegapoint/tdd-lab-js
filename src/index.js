const Promise = require("bluebird");
const express = require('express');
const australia = require('./australia');

const app = express();
const port = 8080;

app.get('/wombats', async (req, res, next) => {
    try {
        const wombats = await australia().wombats();
        res.json(wombats);
    }
    catch (e) {
        next(e);
    }
});
app.get('/wallabies', async (req, res, next) => {
    try {
        let wallabies = await australia().wallabies();
        res.json(wallabies);
    }
    catch (e) {
        next(e);
    }
});

const appStarted = new Promise((resolve, reject) => {
    const server = app.listen(port, (something) => {
        console.log(`Animals in Australia listening on port ${port}!`);
        resolve(server);
    })
});

module.exports = appStarted;