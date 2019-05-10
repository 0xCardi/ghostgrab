// send compressed (if possible) views and JSON to the web browser from the
// server.

const bole = require('bole');
const crypto = require('crypto');
const zlib = require('zlib');
const sumReq = require('./sum-req');

const pkg = require('../../package');
const log = bole(pkg.name);

const IS_DEV = process.env.NODE_ENV !== 'production';
// https://serverfault.com/questions/253074/452642#452642
const COMPRESS_LEVEL = 2;

function canCompress(req) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
    var acceptEncoding = req.headers['accept-encoding'] || '';
    return /gzip/.test(acceptEncoding);
}

function sendCompressed(req, res, data, done) {
    done = typeof done === 'function' ? done : (() => { });

    if (!canCompress(req)) {
        res.end(data);
        return done();
    }

    zlib.gzip(data, { level: COMPRESS_LEVEL }, (err, gzipped) => {
        if (err) {
            log.error(sumReq(req), err);
            res.end(null);
            return done();
        }

        res.setHeader('Content-Encoding', 'gzip');
        res.end(gzipped);
        return done();
    });
}

function sendJson(req, res, obj) {
    res.setHeader('Content-Type', 'application/javascript');

    let json;

    try {
        json = JSON.stringify(obj, null, IS_DEV ? '  ' : '');
    } catch (e) {
        log.error(sumReq(req), e);
        json = 'null';
        res.statusCode = 500;
    }

    sendCompressed(req, res, json);
}

module.exports.json = sendJson;
