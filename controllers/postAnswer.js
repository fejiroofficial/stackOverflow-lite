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
            status: "success",
            message: "Answers has been added",
            answer: answer,
        });
    })
    .catch((err) => {
        console.log(err)
        return res.status(500).json({
            status: "fail",
            message: "unable to upload your answers"
        });
    })
};

export default postAnswer;
