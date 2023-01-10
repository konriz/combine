import { expect } from 'chai';
import { routingTable } from '../routingTable.js';

describe('Routing table', () => {
  const routingTableInstance = routingTable({ existing: 80 });

  it('Should resolve existing mapping', () => {
    const existingUrl = '/existing';
    expect(routingTableInstance.resolvePort(existingUrl)).to.eql(80);
  });

  it('Should return undefined on non-existing mapping', () => {
    const nonExistingUrl = '/non-existing';
    expect(routingTableInstance.resolvePort(nonExistingUrl)).to.be.undefined;
  });
});
