import db from '../db';

const getAllQuestions = (req, res) => {
  db.task('allQuestions', db => db.questions.allData()
  .then((questions) => {
    const allQuestions = { ...questions }
    return res.status(200).json({
      success: 'true',
      questions: allQuestions
    })
  }))
};


export default getAllQuestions;