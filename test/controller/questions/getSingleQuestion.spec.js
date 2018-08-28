import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import app from '../../../app';

chai.use(chaiHttp);


describe('Get a single question', () => {
  it('should return question if it exist', (done) => {
    chai
      .request(app)
      .get('api/v1/questions/1')
      .set('token', `${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('successful');
        expect(res.body.question).to.be.an('object');
        done(); 
      });
  });
  

  it('should return 404 if question does not exist', (done) => {
    chai
      .request(app)
      .get('api/v1/questions/100')
      .set('token', `${jwt.sign({ id: 100 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('question not found');
        done();
      });
  });
});