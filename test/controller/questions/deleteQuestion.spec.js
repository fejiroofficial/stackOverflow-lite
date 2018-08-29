import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



import app from '../../../app';
dotenv.config();

chai.use(chaiHttp);

describe('Delete a specific question', () => {
  it('should return 401 if owner not authorized', (done) => {
    chai
      .request(app)
      .delete('/api/v1/questions/100')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal('false');
        expect(res.body.message).to.equal('User authorization token is required');
        done();
      });
  });
  it ('should return user if user exist', (done) => {
    chai
      .request(app)
      .delete('/api/v1/questions/1')
      .set('token', `${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .end((err, res) => {
        done();
      });  
  })

  it ('should return 404 if question does not exist', (done) => {
    chai
      .request(app)
      .delete('/api/v1/questions/100')
      .set('token', `${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal('false');
        expect(res.body.message).to.equal('question not found');
        done();
      });
      
  })

  it ('should return 200 if question belongs to the user', (done) => {
    chai
      .request(app)
      .get('/api/v1/questions/1')
      .set('token', `${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal('true');
        expect(res.body.message).to.equal('successfully deleted a question');
        done();
      });

  })

//   it('should return 403 if question does not belong to owner', (done) => {
//     chai
//       .request(app)
//       .delete('/api/v1/questions/1')
//       //.set('token', `${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
//       .end((err, res) => {
//         expect(res.status).to.equal(403);
//         expect(res.body.status).to.equal('fail');
//         expect(res.body.message).to.equal('Unauthorized to delete this question');

//         done();
//       });
//   });

//   it('should delete question if it exist and belongs to owner', (done) => {
//     chai
//       .request(app)
//       .delete(`${rootUrl}/questions/10`)
//       .set('Authorization', `Bearer ${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body.status).to.equal('success');
//         expect(res.body.message).to.equal('question deleted successfully');
//         done();
//       });
//   });

//   it('should return 404 if a question is requested after it has been deleted', (done) => {
//     chai
//       .request(app)
//       .get(`${rootUrl}/question/1`)
//       .set('token', `${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.body.status).to.equal('fail');
//         expect(res.body.message).to.equal('question not found');
//         done();
//       });
//   });
 });
