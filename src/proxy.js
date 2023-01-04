import http from 'http';

http.createServer((req, res) => {

  const port = req.url.includes('node') ? 8081 : 8082;

  const proxiedRequest = http.request({port, path: req.url, headers: req.headers, method: req.method}, (response) => {
    res.writeHead(response.statusCode, response.statusMessage, response.headers);
    response.pipe(res);
  });

  proxiedRequest.on('error', (e) => {
    console.error(`Proxy error: ${e.message}`);
    res.writeHead(500);
    res.end();
  });

  req.pipe(proxiedRequest);

}).listen(8080, () => console.log('Listening on 8080'));

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('server on 8001');
}).listen(8081);
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('server on 8002');
}).listen(8082);
