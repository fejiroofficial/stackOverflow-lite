import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);

describe('Get all questions', () => {
  it('should return an array of questions', (done) => {
    chai
      .request(app)
      .get('/api/v1/questions')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.questions).to.be.an('object');
        done();
      });
  });
});
