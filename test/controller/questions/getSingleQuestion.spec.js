import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);


describe('Get a single question', () => {
  it('should return question if it exist', (done) => {
    chai
      .request(app)
      .get('/api/v1/questions/2')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.question).to.have.property('question_title');
        expect(res.body.question).to.have.property('question_description');
        expect(res.body.question).to.have.property('answers');
        expect(res.body.success).to.equal('true');
        expect(res.body.question).to.be.an('object');
        done(); 
      });
  });
  

  it('should return 404 if question does not exist', (done) => {
    chai
      .request(app)
      .get('/api/v1/questions/100')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal('false');
        expect(res.body.message).to.equal('question does not exist in the database');
        done();
      });
  });
});
