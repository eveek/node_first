const { URL } = require('node:url');
const http = require('node:http');
const fs = require('node:fs');


const server = http.createServer((req, res) => {
    const curURL = new URL(req.url, `http://${req.headers.host}`)
    // const curURL = URL.parsed(req.url, true);
    const curPathname = curURL.pathname;
    let fileToFetch = ' ';
    if (curPathname == '/' || curPathname == ' ' || curPathname == '/index') {
        fileToFetch = '/index.html';
    } else if (curPathname == '/about') {
        fileToFetch = '/about.html';
    } else if (curPathname == '/contact') {
        fileToFetch = '/contact-me.html';
    } else {
        fileToFetch = '/404.html';
    }

    const filePath = '.' + fileToFetch;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(data, 'utf-8')
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data, 'utf-8')
        }

    })
})

server.listen(8080)