function timestampLogString(...payload) {
  return `${Date.now()} : ${payload.join('\n')}`;
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

export function logAround(function_, name, ...parameters) {
  log(`${name} start`);
  const result = function_(...parameters);
  log(`${name} end`);
  return result;
}
