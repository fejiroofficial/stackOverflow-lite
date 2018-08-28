import db from '../db';

const updateAnswer = (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    let { answer } = req.body;
    answer = answer ? answer.toString().trim() : answer;
    console.log(answer);

    db.task('modify-answer', t => t.answers.findById(answerId)
    .then((answerFound) => {
        if (!answerFound){
            return res.status(404).json({
                status: "fail",
                message: "Answer does not exist",
            })
        }
        //does answer belong to the user who wants to update it
        const { userId } = req;
        const owner = answerFound.id === userId
        if (!owner) {
            return res.status(403).json({
                status: "fail",
                message: "you cannot modify this!"
            });
        }
        const updatedAnswer = {
            answer: answer || answer.answerFound
        }
        return t.answers.modify(updatedAnswer, answerId)
        .then((answer) => {
            res.status(200).json({
                status: "success",
                message: "answer modified by you",
                answer: answer,
            })
        })
        .catch((err) => {
            return res.status(500).json({
                status: "fail",
                message: "answer could not be modified"
            })
        })
}));
}

export default updateAnswer;
