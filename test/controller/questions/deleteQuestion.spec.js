import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import app from '../../../app';

chai.use(chaiHttp);

const myUrl = '/api/v1';

describe('Delete single Entry', () => {

  it('should delete question if it exist and belongs to owner', (done) => {
    chai
      .request(app)
      .delete(`${myUrl}/questions/1`)
      .set('token', `${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal('true');
        expect(res.body.message).to.equal('successfully deleted a question');
        done();
      });
  });

  it('should return 401 if question does not belong to who wants to delete it', (done) => {
    chai
      .request(app)
      .delete(`${myUrl}/questions/2`)
      .set('token', `${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '4hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal('false');
        expect(res.body.message).to.equal('unauthorized to delete this question');
        done();
      });
  });

});