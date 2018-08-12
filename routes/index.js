import express from 'express';
import questionCtrl from '../controllers';

const router = express.Router()

router.route('/questions')
      .get(questionCtrl.getAllQuestions);

router.get('/questions/:id', questionCtrl.getSingleQuestion);


export default router;