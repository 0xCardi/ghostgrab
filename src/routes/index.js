const bodyParser = require('body-parser');
const getConfig = require('../lib/get-config');
const slowDown = require("express-slow-down");

module.exports = app => {
    const config = getConfig();

    app.get('/search', (req, res) => {
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
        const isPassSet = !!config.password.length;

        if (req.body.username === config.username &&
            (!isPassSet || req.body.password === config.password)) {
            res.json(true);
        } else {
            res.json(false);
        }
    });
};