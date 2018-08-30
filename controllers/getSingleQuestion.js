import db from '../db';

const getSingleQuestion = (req, res) => {
  const question_id = parseInt(req.params.id, 10);
  db.tx( db => {
    const queryOne = db.questions.findById(question_id);
    const querytwo = db.answers.all(question_id);
    return t.batch([queryOne, querytwo]);
  })
    .then((result) => {
      res.status(200).json({
        success: 'true',
        question: result,
      });

    })
    .catch(err => {
      return res.status(404).json({
        success: 'false',
        message: 'question does not exist in the database'
      })
    })
};
export default getSingleQuestion;
