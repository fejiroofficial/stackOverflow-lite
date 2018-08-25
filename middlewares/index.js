import validatePostQuestion from './validatePostQuestion';
import validatePostAnswer from './validatePostAnswer';
import validateSignup from './validateSignup';
import validateSignin from './validateSignin';


const middlewares = {
    validatePostQuestion,
    validatePostAnswer,
    validateSignup,
    validateSignin
}

export default middlewares;
