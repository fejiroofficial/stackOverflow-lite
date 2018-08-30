import db from '../db';

const deleteQuestion = (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  return db.task('delete', db => db.questions.findById(questionId)
    .then((question) => {
      if (!question) {
        return res.status(404).json({
          success: 'false',
          message: 'question not found',
        });
      }
      // check if question belongs to user
      const { userId } = req;
      if (question.user_id === userId) {
        return db.questions.remove(questionId)
          .then((question) => (
            db.answers.remove(question.user_id)
              .then((answer) => {
                res.status(200).json({
                  success: 'true',
                  message: 'successfully deleted a question'
                })
              })  
          ));
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: 'false',
        message: 'unable to delete this question',
      });
    }));
};

export default deleteQuestion;
