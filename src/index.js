const Promise = require("bluebird");
const express = require('express');
const australia = require('./australia');
const geocoding = require('./geocoding');

const app = express();
const port = process.env.PORT;

app.get('/healthcheck', async (req, res) => {
    res.json({message: 'ok'});
});
app.get('/wombats', async (req, res, next) => {
    try {
        const wombats = await australia(geocoding).wombats();
        res.json(wombats);
    }
    catch (e) {
        next(e);
    }
});
app.get('/wallabies', async (req, res, next) => {
    try {
        let wallabies = await australia(geocoding).wallabies();
        res.json(wallabies);
    }
    catch (e) {
        next(e);
    }
});

const appStarted = new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
        console.log(`Animals in Australia listening on port ${server.address().port}!`);
        resolve(server);
    })
});

module.exports = appStarted;