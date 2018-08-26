import express from 'express';
import userCtrl from '../controllers/user';
import questionCtrl from '../controllers'
import middlewares from '../middlewares';

const router = express.Router();

router.post('/auth/signup', middlewares.validateSignup, userCtrl.signup);
router.post('/auth/login', middlewares.validateSignin, userCtrl.signin);
router.get('/questions', questionCtrl.getAllQuestions);
router.use('*',  middlewares.verifyToken)
router.route('/questions')
        .get(questionCtrl.getAllQuestions)
        .post(middlewares.validatePostQuestion, questionCtrl.postQuestion); 
router.get('/questions/:id', questionCtrl.getSingleQuestion);

export default router;
