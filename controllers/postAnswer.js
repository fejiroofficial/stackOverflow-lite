import { allQuestions } from '../datastore/questions';
import { answers } from '../datastore/questions';
import db from '../datastore/helperFn';


const postAnswer = (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const questionFound = db.findOne(allQuestions, questionId);
    const { answer } = req.body;
    const now = new Date().toISOString();
    if( questionFound < 1 ) {
        return res.status(404).json({
            status: "fail",
            message: "No question found with provided params"
        })
    } 
    const newAnswer = {
        id: answers.length + 1,
        answer,
        questionId: questionId,
        createdAt: now,
        updatedAt: now
    }
    answers.push(newAnswer); 
    return res.status(201).json({
        status: "successful",
        message: "Answer added successfully",
        answer: newAnswer
    });
}

export default postAnswer;