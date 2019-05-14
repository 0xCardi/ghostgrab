const bodyParser = require('body-parser');
const config = require('../lib/config');
const slowDown = require('express-slow-down');
const attachIndexHtml = require('./index-html');

module.exports = app => {
    attachIndexHtml(app);

    app.post('/search', (req, res) => {
        console.log(req);
        res.end('');
    });

    const bodyParse = bodyParser.urlencoded({ extended: false });
    const loginLimiter = slowDown({
        windowMs: 5 * 60 * 1000, // 5 minutes
        delayAfter: 5, // delay for 5 minutes after 5 attempts
        delayMs: 250, // after 5 attempts, delay by +250ms delay for 5 mins
        maxDelayMs: 60 * 1000
    });

    app.post('/login', loginLimiter, bodyParse, (req, res) => {
        const conf = config.get();
        const isPassSet = !!conf.password.length;

        if (req.body.username === conf.username &&
            (!isPassSet || req.body.password === conf.password)) {
            res.json(true);
        } else {
            res.json(false);
        }
    });
};
