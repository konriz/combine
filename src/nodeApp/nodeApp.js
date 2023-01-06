import http from 'http';
import {initLogString, logAround} from '../logging.js';

export function bootstrap(port) {
  return logAround(createServer, initLogString('node', port), port, requestHandler,
  );
}

function createServer(port, handler) {
  return http.createServer(handler).listen(port);
}

function requestHandler(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(`Hello World!`);
  res.end();
}
