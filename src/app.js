import http from 'http';
import {timestampLogString} from './logging.js';

function bootstrap(port) {
  return logAround(createServer, `createServer at ${port}`, port, (req, res) => logAround(requestHandler, 'requestHandler', req, res));
}

function createServer(port, handler) {
  return http.createServer(handler).listen(port);
}

function requestHandler(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
}

function logAround(fn, name, ...params) {
  console.log(timestampLogString(`Function ${name} start`));
  const result = fn(...params);
  console.log(timestampLogString(`Function ${name} end`));
  return result;
}


const PORT = 8080;

export const app = bootstrap(PORT);
