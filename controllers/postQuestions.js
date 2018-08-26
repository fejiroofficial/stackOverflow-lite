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
        status: "successful",
        message: "Question created successfully",
        question: question,
      });
    })
 
  .catch((err) => {
    console.log(err)
    return res.status(500).json({
      status: "fail",
      message: "unable to register your question"
    });
  })
};

export default postQuestion;
