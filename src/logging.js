function timestampLogString(...payload) {
  return `${new Date().getTime()} : ${payload.join('\n')}`;
}

export function log(...payload) {
  console.log(timestampLogString(payload));
}

export function logError(...payload) {
  console.error(timestampLogString(...payload));
}
