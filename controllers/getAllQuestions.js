import { allQuestions } from '../datastore/questions';

const getAllQuestions = (req, res) => {
    if (allQuestions.length < 1){
        return allQuestions;
    }
    res.status(200).json ({
        status: "success",
       questions: allQuestions
    });
}

export default getAllQuestions;