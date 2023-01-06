import http from 'http';
import {log, logError} from './logging.js';

export function bootstrap(port, routingTable) {
  return http.createServer((req, res) => {

    const port = routingTable.resolvePort(req.url);

    if (!port) {
      res.writeHead(404);
      res.end();
    }

    const proxyedRequest = proxyRequest(req, res, port);

    proxyedRequest.on('error', (e) => {
      logError(`Proxy error: ${e.message}`);
      res.writeHead(500);
      res.end();
    });

    req.pipe(proxyedRequest);

  }).listen(port, () => log(`Listening on ${port}`));
}

function proxyRequest(req, res, port) {
  return http.request({port, path: req.url, headers: req.headers, method: req.method}, (response) => {
    res.writeHead(response.statusCode, response.statusMessage, response.headers);
    response.pipe(res);
  });
}
