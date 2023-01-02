import http from 'http';

const PORT = 8080;

logAround(createServer, `createServer at ${PORT}`, PORT, (req, res) => logAround(requestHandler, 'requestHandler', req, res));

function createServer(port, handler) {
    http.createServer(handler).listen(port);
}

function requestHandler(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
}

function logAround(fn, name, ...params) {
    console.log(`${new Date().getTime()} : Function ${name} start`);
    fn(...params);
    console.log(`${new Date().getTime()} : Function ${name} end`)
}
