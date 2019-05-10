const IS_DEV = process.env.NODE_ENV !== 'production';

const pkg = require('../../package');

module.exports = app => {
    let getPath;

    if (IS_DEV) {
        getPath = path => path;
    } else {
        getPath = app.get('staticify').getVersionedPath;
    }

    const indexHtml = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="description" content="${pkg.description}">
                <meta name="author" content="${pkg.author}">
                <title>${pkg.name}</title>
                <link rel="stylesheet" href="${getPath('/build.css')}">
            </head>
            <body>
                <div id="app"></div>
                <script src="${getPath('/build.js')}"></script>
            </body>
        </html>`.replace(/    /g, '').replace(/\n/g, '');

    app.get(['/', '/index.html', '/index.htm'], (req, res) => {
        res.end(indexHtml);
    });
};
