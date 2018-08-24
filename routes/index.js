import express from 'express';
import userCtrl from '../controllers/user';
import middlewares from '../middlewares';

const router = express.Router();

// create new user route
router.post('/auth/signup', middlewares.validateSignup, userCtrl.signup);
export default router;