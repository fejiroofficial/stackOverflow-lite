import db from '../db';

const getAllQuestions = (req, res) => {
  db.task("allQuestions", t => t.questions.allData()
  .then((questions) => {
    const allQuestions = { ...questions }
    return res.status(200).json({
      status: "success",
      questions: allQuestions
    })
  }))
};


export default getAllQuestions;