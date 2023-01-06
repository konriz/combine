function timestampLogString(...payload) {
  return `${new Date().getTime()} : ${payload.join('\n')}`;
}

export function initLogString(appName, port) {
  return `Init ${appName}@${port}`;
}

export function log(...payload) {
  console.log(timestampLogString(payload));
}

export function logError(...payload) {
  console.error(timestampLogString(...payload));
}

export function logAround(fn, name, ...params) {
  log(`${name} start`);
  const result = fn(...params);
  log(`${name} end`);
  return result;
}
