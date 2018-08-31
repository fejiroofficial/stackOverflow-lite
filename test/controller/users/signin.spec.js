import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';

import app from '../../../app';

chai.use(chaiHTTP);

describe('User signin', () => {
    it('if email is not provided', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/login')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            })
    })
    it('if password is not provided', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/login')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            })
    })
})

