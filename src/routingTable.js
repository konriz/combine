export function routingTable(rootToPortMapping) {

  function resolvePort(url) {
    const root = url.split('/')[1].split('?')[0];
    return rootToPortMapping[root];
  }

  return {resolvePort};
}
