import request from 'supertest';
import { expect } from 'chai';
import { runGraphApp } from '../../src/graphQLApp/runGraphApp.js';

describe('Graph app test', async () => {
  const graphAppInstance = await runGraphApp();

  it('should return with 200', async () => {
    const response = await request(graphAppInstance).get('');
    expect(response.status).to.be.eql(200);
  });
});
