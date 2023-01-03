import * as config from './config/index.js';
import http from 'http';
import {timestampLogString} from './logging.js';

function bootstrap(port) {
  return logAround(createServer, `createServer at ${port}`, port, (req, res) =>
    logAround(requestHandler, 'requestHandler', req, res),
  );
}

function createServer(port, handler) {
  return http.createServer(handler).listen(port);
}

function requestHandler(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(`Hello World! ${config.common.title}`);
  res.end();
}

function logAround(fn, name, ...params) {
  console.log(timestampLogString(`Function ${name} start`));
  const result = fn(...params);
  console.log(timestampLogString(`Function ${name} end`));
  return result;
}

export const app = bootstrap(config.common.port);
