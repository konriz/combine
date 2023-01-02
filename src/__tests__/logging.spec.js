import { expect } from 'chai';
import { timestampLogString } from '../logging.js';

describe('Logging utils', () => {
  it('Should add millis timestamp to log', () => {
    expect(timestampLogString('Hello World!').match(/[\d]{13} : Hello World!/).length).to.eql(1);
  });
});
