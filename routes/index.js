import express from 'express';
import userCtrl from '../controllers/user';
import questionCtrl from '../controllers'
import middlewares from '../middlewares';

const router = express.Router();

router.post('/auth/signup', middlewares.validateSignup, userCtrl.signup);
router.post('/auth/login', middlewares.validateSignin, userCtrl.signin);
router.get('/questions', questionCtrl.getAllQuestions);
router.get('/questions/:id', questionCtrl.getSingleQuestion); 


router.use('*',  middlewares.verifyToken)

router.post('/questions', middlewares.validatePostQuestion, questionCtrl.postQuestion); 
router.delete('/questions/:id', questionCtrl.deleteQuestion);
router.post('/questions/:id/answers', middlewares.validatePostAnswer, questionCtrl.postAnswer);
router.put('/questions/:id/answers/:id', middlewares.validatePostAnswer, questionCtrl.updateAnswer);

export default router;
