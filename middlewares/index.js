import validatePostQuestion from './validatePostQuestion';
import validatePostAnswer from './validatePostAnswer';
import validateSignup from './validateSignup';


const middlewares = {
    validatePostQuestion,
    validatePostAnswer,
    validateSignup
}

export default middlewares;
