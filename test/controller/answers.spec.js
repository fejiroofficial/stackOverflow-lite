import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';
import { allQuestions, answers } from '../../datastore/questions';

chai.use(chaiHttp);

describe('ANSWERS CONTROLLER', () => {
  // test answer controller
  const answer = {
    id: 1,
    answer: 'This is just an answer',
    questionId: allQuestions[0].id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  before(() => {
    answers.length = 0;
  });

  describe('Post an answer', () => {
    const validAnswer = {
      answer: 'why not ask google!'
    };
    
    describe('when invalid data is passed', () => {
      it('should not create an answer resource', (done) => {
        const invalidAnswer = Object.assign({}, validAnswer, {
          answer: '',
        });

        chai
          .request(app)
          .post('/api/v1/questions/1/answers')
          .send(invalidAnswer)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
    });

    describe('when passed valid data is passed', () => {
      it('should create an answer resource', (done) => {
        chai
          .request(app)
          .post('/api/v1/questions/1/answers')
          .send(validAnswer)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal('successful');
            expect(res.body.answer).to.be.an('object');
            done();
          });
      });
    });


  });
});
