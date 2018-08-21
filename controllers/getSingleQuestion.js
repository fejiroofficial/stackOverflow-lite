import { allQuestions } from '../datastore/questions';
import db from '../datastore/helperFn';

const getSingleQuestion = (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const questionFound = db.findOne(allQuestions, questionId);
    
    if (questionFound.length > 0) {
       return res.status(200).json ({
            status: "success",
           questions: questionFound[0]
        });
    }
    return res.status(404).json ({
        status: "fail",
        message: "Question not found"
    });
}

export default getSingleQuestion;