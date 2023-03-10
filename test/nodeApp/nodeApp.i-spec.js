import request from 'supertest';
import { expect } from 'chai';
import { bootstrap } from '../../src/nodeApp/nodeApp.js';

const nodeApp = bootstrap(8080);

describe('Node app test', () => {
  it('should return with 200', async () => {
    const response = await request(nodeApp).get('');
    expect(response.status).to.be.eql(200);
  });
});
