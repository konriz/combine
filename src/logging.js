export function timestampLogString(...payload) {
    return `${new Date().getTime()} : ${payload.join('\n')}`;
}
