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
        message: 'Answer added',
        answer: answer
      })
    })
    .catch((err) => {
      return res.status(404).json({
        success: 'false',
        message: 'question does not exist in the database'
      });
    })
}

export default postAnswer;
