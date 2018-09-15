import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../../app';

chai.use(chaiHttp);


const myUrl = '/api/v1';

describe('Post question', () => {
  const newQuestion = {
    id: 3,
    userId: 2,
    questionTitle: '403 forbidden',
    questionDescription: 'I am getting this error all the time',
  };

  it('should throw an error if title is not provided', (done) => {
    const blankTitle = { ...newQuestion };
    delete blankTitle.questionTitle;

    chai
      .request(app)
      .post(`${myUrl}/questions`)
      .set('token', `${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .send(blankTitle)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Title is required');
        done();
      });
  });

  it('should throw an error if description is not provided', (done) => {
    const blankTitle = { ...newQuestion };
    delete blankTitle.questionDescription;

    chai
      .request(app)
      .post(`${myUrl}/questions`)
      .set('token', `${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .send(blankTitle)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Description is required');
        done();
      });
  });


  it('should reject request if title is more than 120 characters', (done) => {
    const titleLong = { ...newQuestion,
      questionTitle: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    };

    chai
      .request(app)
      .post(`${myUrl}/questions`)
      .set('token', `${jwt.sign({ id: 1 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .send(titleLong)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal('false');
        expect(res.body.message).to.equal('question title must be a maximum of 120 characters');
        done();
      });
  });

  it('should return successful if question is posted', (done) => {
    const question = { ...newQuestion };
    chai
      .request(app)
      .post(`${myUrl}/questions`)
      .set('token', `${jwt.sign({ id: 2 }, process.env.SECRET_KEY, { expiresIn: '24hrs' })}`)
      .send(question)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal('true');
        expect(res.body.message).to.equal('Question created successfully');
        expect(res.body.question).to.be.an('object');
        done();
      });
  });

});

