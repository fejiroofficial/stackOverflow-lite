import validatePostQuestion from './validatePostQuestion';
import validatePostAnswer from './validatePostAnswer';
import validateSignup from './validateSignup';
import validateSignin from './validateSignin';
import verifyToken from './verifyToken';


const middlewares = {
    validatePostQuestion,
    validatePostAnswer,
    validateSignup,
    validateSignin,
    verifyToken
}

export default middlewares;
