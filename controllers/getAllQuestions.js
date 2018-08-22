import { allQuestions } from '../datastore/questions';

const getAllQuestions = (req, res) => {
    res.status(200).json({
        status: "success",
        questions: allQuestions
    });
}

export default getAllQuestions;