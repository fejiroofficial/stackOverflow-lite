import { allQuestions } from '../datastore/questions';

const postQuestion = (req, res) => {
    const { title, body} = req.body;
    const now = new Date().toISOString();

    const newQuestion = {
        id : allQuestions.length + 1,
        title,
        body,
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