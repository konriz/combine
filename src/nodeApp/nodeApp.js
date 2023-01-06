import http from 'http';
import {nodeApp} from '../config/index.js';
import {log} from '../logging.js';

export function bootstrap(port) {
  return logAround(createServer, `createServer at ${port}`, port, (req, res) =>
    logAround(requestHandler, 'requestHandler', req, res),
  );
}

function createServer(port, handler) {
  return http.createServer(handler).listen(port);
}

function requestHandler(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(`Hello World! ${nodeApp.title}`);
  res.end();
}

function logAround(fn, name, ...params) {
  log(`Function ${name} start`);
  const result = fn(...params);
  log(`Function ${name} end`);
  return result;
}
