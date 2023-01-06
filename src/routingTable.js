export function routingTable(rootToPortMapping) {

  function resolvePort(url) {
    const root = new URL(url).pathname.split('/')[1];
    return rootToPortMapping[root];
  }

  return {resolvePort};
}
