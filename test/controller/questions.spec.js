import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';
import { allQuestions, answers } from '../../datastore/questions';

chai.use(chaiHttp);

describe('QUESTIONS CONTROLLER', () => {
  const question = {
    id: 1,
    questionTitle: 'Hello World',
    questionDescription: 'Hello world, just greeting',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  before(() => {
    allQuestions.length = 0;
  });

  describe('Get all questions', () => {
    describe('When question exist', () => {
      before(() => {
        allQuestions.push(question);
      });

      it('should return a list of all questions', (done) => {
        chai
          .request(app)
          .get('/api/v1/questions')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.questions).to.be.an('array');
            expect(res.body.questions).to.not.be.empty;
            done();
          });
      });
    });
  });

  describe('Get single question', () => {
    before(() => {
      allQuestions.push(question);
    });

    it('should get a single question', (done) => {
      chai
        .request(app)
        .get('/api/v1/questions/1')
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.questions).to.be.an('object');
          done();
        });
    });

    it('should return 404 if question not found', (done) => {
      chai
        .request(app)
        .get('/api/v1/questions/100')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Question not found');
          done();
        });
    });
  });

  describe('Post a single question', () => {
    const validQuestion = {
      questionTitle: 'What a question?',
      questionDescription: 'i have a question here',
    };

    describe('when invalid data is passed', () => {
      it('should not create a question resource', (done) => {
        const invalidQuestion = Object.assign({}, validQuestion, {
          questionTitle: '',
          questionDescription: ''
        });

        chai
          .request(app)
          .post('/api/v1/questions')
          .send(invalidQuestion)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('fail');
            done();
          });
      });
    });

    describe('when passed valid data is passed', () => {
      it('should create question resource', (done) => {
        chai
          .request(app)
          .post('/api/v1/questions')
          .send(validQuestion)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal('successful');
            expect(res.body.question).to.be.an('object');
            done();
          });
      });
    });
  });
});

