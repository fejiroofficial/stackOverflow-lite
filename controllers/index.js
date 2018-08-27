import getAllQuestions from './getAllQuestions';
import getSingleQuestion from './getSingleQuestion';
import postQuestion from './postQuestions';
import postAnswer from './postAnswer';
import deleteQuestion from './deleteQuestion';
import updateAnswer from './updateAnswer';

const questionCtrl = {
    getAllQuestions,
    getSingleQuestion,
    postQuestion,
    postAnswer,
    deleteQuestion,
    updateAnswer,
}

export default questionCtrl;
