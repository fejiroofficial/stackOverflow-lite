import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';
import db from '../../../db';
import app from '../../../app';

chai.use(chaiHTTP);

describe('User signup', () => {

  it('if email is not provided', (done) => {
    let user = {
      id: 1,
      firstname: "Okeoghene",
      lastname: "Gospel",
      email: "",
      password: "123456",
      createdAt: "2018-09-02T19:49:33.273Z",
      updatedAt: "2018-09-02T19:49:33.273Z"
    }
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Email is required')
        done();
      });
  });
  it('if password is not provided', (done) => {
    let user = {
      id: 1,
      firstname: "Okeoghene",
      lastname: "Gospel",
      email: "oke@gmail.com",
      password: "",
      createdAt: "2018-09-02T19:49:33.273Z",
      updatedAt: "2018-09-02T19:49:33.273Z"
    }
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Password is required')
        done();
      })
  })
  it('if email and password are not provided', (done) => {
    let user = {
      id: 1,
      firstname: 'Okeoghene',
      lastname: 'Gospel',
      email: '',
      password: '',
      createdAt: '2018-09-02T19:49:33.273Z',
      updatedAt: '2018-09-02T19:49:33.273Z'
    }
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Email and Password are required')
        done();
      })
  })
  it('should not register user if email already exist in db', (done) => {
    let user = {
      id: 1,
      firstname: 'Okeoghene',
      lastname: 'Gospel',
      email: 'oke@gmail.com',
      password: '123456',
      createdAt: '2018-09-02T19:49:33.273Z',
      updatedAt: '2018-09-02T19:49:33.273Z'
    }
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.success).to.equal('false')
        expect(res.body.message).to.equal('user with this email already exists');
        done();
      });
  });

})