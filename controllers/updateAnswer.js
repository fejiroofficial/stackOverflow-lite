import db from '../db';

const updateAnswer = (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    let { answer } = req.body;
    answer = answer ? answer.toString().trim() : answer;


    db.task('modify-answer', db => db.answers.findById(answerId)
        .then((answerFound) => {
            //does answer belong to the user who wants to update it
            const { userId } = req;
            const owner = answerFound.user_id === userId
            if (!owner) {
                return res.status(403).json({
                    success: 'false',
                    message: 'sorry, cannot modify an answer that is not yours!'
                });
            }
            const updatedAnswer = {
                answer: answer || answer.answerFound
            }
            return db.answers.modify(updatedAnswer, answerId)
                .then((answer) => {
                    res.status(200).json({
                        success: 'true',
                        message: 'successful! answer modified by you',
                        answer: answer,
                    })
                })
                .catch((err) => {
                    return res.status(500).json({
                        success: 'false',
                        message: 'answer could not be modified'
                    })
                })
        })
        .catch((err) => {
            return res.status(404).json({
                success: 'false',
                message: 'Not found! Either Question or answer does not exist in the database'
            })
        })
    );
}

export default updateAnswer;
