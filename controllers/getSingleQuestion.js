import db from '../db';

const getSingleQuestion = (req, res) => {
  const question_id = parseInt(req.params.id, 10);
  db.tx(t => {
    const q1 = t.questions.findById(question_id);
    const q2 = t.answers.all(question_id);
    return t.batch([q1, q2]);
  })
    .then((result) => {
      res.status(200).json({
        status: "successful",
        question: result,
      });

    })
    .catch(err => {
      return res.status(404).json({
        status: "fail",
        message: "question not found"
      })
    })
};
export default getSingleQuestion;
