import express from 'express';
import userCtrl from '../controllers/user';
import questionCtrl from '../controllers'
import middlewares from '../middlewares';

const router = express.Router();

router.post('/auth/signup', middlewares.validateSignup, userCtrl.signup);
router.post('/auth/login', middlewares.validateSignin, userCtrl.signin);

router.use('*',  middlewares.verifyToken)

router.get('/questions', questionCtrl.getAllQuestions);

router.route('/questions')
        .get(questionCtrl.getAllQuestions)
        .post(middlewares.validatePostQuestion, questionCtrl.postQuestion); 

router.route('/questions/:id')
      .get(questionCtrl.getSingleQuestion)
      .delete(questionCtrl.deleteQuestion);

router.post('/questions/:id/answers', middlewares.validatePostAnswer, questionCtrl.postAnswer);
router.put('/questions/:id/answers/:id', middlewares.validatePostAnswer, questionCtrl.updateAnswer);

export default router;
