import db from '../db';

const postQuestion = (req, res) => {
  const { userId } = req;
  let { questionTitle, questionDescription } = req.body;
  questionTitle = questionTitle ? questionTitle.toString().trim() : questionTitle;
  questionDescription = questionDescription ? questionDescription.toString().trim() : questionDescription;

  const newQuestion = {
    userId,
    questionTitle,
    questionDescription,
  }

  return db.questions.create(newQuestion)
    .then((question) => {
      res.status(201).json({
        success: 'true',
        message: 'Question created successfully',
        question: question,
      });
    })
 
  .catch((err) => {
    return res.status(500).json({
      success: 'false',
      message: 'unable to register your question'
    });
  })
};

export default postQuestion;
