import { allQuestions } from '../datastore/questions';

const postQuestion = (req, res) => {
    const { questionTitle, questionDescription} = req.body;
    const now = new Date().toISOString();

    const newQuestion = {
        id : allQuestions.length + 1,
        questionTitle,
        questionDescription,
        createdAt: now,
        updatedAt: now   
    }
    
    allQuestions.push(newQuestion);
    return res.status(201).json({
        status: 'successful',
        message: 'Question created successfully',
        question: newQuestion
    });
    
}

export default postQuestion;