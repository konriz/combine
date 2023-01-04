import http from 'http';

export function bootstrap(port) {
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

  }).listen(port, () => console.log(`Listening on ${port}`));
}
