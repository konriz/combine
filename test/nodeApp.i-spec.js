import request from 'supertest';
import {expect} from 'chai';
import {bootstrap} from '../src/nodeApp.js';

const nodeApp = bootstrap(8080);

describe('App test', () => {
  it('should return with 200', async () => {
    const response = await request(nodeApp).get('');
    expect(response.status).to.be.eql(200);
  });
});
