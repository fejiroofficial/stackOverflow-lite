import express from 'express';
import userCtrl from '../controllers/user';
import middlewares from '../middlewares';

const router = express.Router();

router.post('/auth/signup', middlewares.validateSignup, userCtrl.signup);
router.post('/auth/login', middlewares.validateSignin, userCtrl.signin);

export default router;
