import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import app from '../../../app';

chai.use(chaiHttp);

describe('Get all questions', () => {
  it('should return an array of questions', (done) => {
    chai
      .request(app)
      .get('/api/v1/questions')
      .set('token', `${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.questions).to.be.an('object');
        done();
      });
  });
});
