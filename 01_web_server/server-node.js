const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    } else if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    } else if (req.url === '/api/posts') {
        res.write(JSON.stringify([4, 5, 6]));
        res.end();
    } else if (req.url === '/api/users') {
        res.write(JSON.stringify([7, 8, 9]));
        res.end();
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not found\n');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});