import db from '../db';

const postAnswer = (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    let { answer } = req.body;
    answer = answer ? answer.toString().trim() : answer;

    const { userId } = req;
    const newAnswer = {
        userId,
        questionId,
        answer
    }

    return db.answers.create(newAnswer)
    .then((answer) => {
        res.status(201).json({
            success: 'true',
            message: 'Answer has been successfully added',
            answer: answer,
        });
    })
    .catch((err) => {
        return res.status(500).json({
            success: 'false',
            message: 'unable to upload your answer'
        });
    })
};

export default postAnswer;
