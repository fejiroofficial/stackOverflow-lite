import express from 'express';
import questionCtrl from '../controllers';
import middlewares from '../middlewares'

const router = express.Router();

router.route('/questions')
      .get(questionCtrl.getAllQuestions)
      .post(middlewares.validatePostQuestion, questionCtrl.postQuestion);

router.get('/questions/:id', questionCtrl.getSingleQuestion);
router.post('/questions/:id/answers', middlewares.validatePostAnswer, questionCtrl.postAnswer);



export default router;