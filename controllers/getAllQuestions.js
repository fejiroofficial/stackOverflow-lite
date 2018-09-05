import db from '../db';

const getAllQuestions = (req, res) => {
  db.task('allQuestions', db => db.questions.allData()
  .then((questions) => {
    const allQuestions = [ ...questions ];
    return res.status(200).json({
      success: 'true',
      questions: allQuestions
    })
  })
  .catch((err) => {
    res.status(404).json({
      success: 'false',
      message: 'nothing found in the database'
    })
  })
)
};


export default getAllQuestions;