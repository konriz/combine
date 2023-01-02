import request from 'supertest';
import {expect} from "chai";
import {app} from "../src/app.js";

describe('App test', () => {
    it('should return with 200', async () => {
        const response = await request(app).get('');
        expect(response.status).to.be.eql(200);
    });
});

