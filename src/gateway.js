import http from 'node:http';
import {initLogString, log, logAround, logError} from './logging.js';

export function bootstrap(port, routingTable) {
  return logAround(createServer, initLogString('gateway', port), port, routingTable);
}

export function createServer(port, routingTable) {
  return http.createServer((request, res) => {

    const port = routingTable.resolvePort(request.url);

    if (!port) {
      res.writeHead(404);
      res.end();
    }

    const proxyedRequest = proxyRequest(request, res, port);

    proxyedRequest.on('error', (e) => {
      logError(`Proxy error: ${e.message}`);
      res.writeHead(500);
      res.end();
    });

    request.pipe(proxyedRequest);

  }).listen(port, () => log(`Listening on ${port}`));
}

function proxyRequest(request, res, port) {
  return http.request({port, path: request.url, headers: request.headers, method: request.method}, (response) => {
    res.writeHead(response.statusCode, response.statusMessage, response.headers);
    response.pipe(res);
  });
}
