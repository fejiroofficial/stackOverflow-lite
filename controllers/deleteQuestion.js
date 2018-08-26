import db from '../db';

const deleteQuestion = (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  return db.task('delete', t => t.questions.findById(questionId)
    .then((question) => {
      if (!question) {
        return res.status(404).json({
          status: 'fail',
          message: 'question not found',
        });
      }
      console.log(question);
      // check if question belongs to user
      const { userId } = req;
      console.log(question.user_id);
      console.log(userId, '========>')

      if (question.user_id === userId) {
        return t.questions.remove(questionId)
          .then((question) => (
            db.answers.remove(question.user_id)
              .then((answer) => {
                res.status(200).json({
                  status: "successful",
                  message: "succefully deleted a question"
                })
              })  
          ));
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 'fail',
        message: 'unable to delete this question',
      });
    }));
};

export default deleteQuestion;
