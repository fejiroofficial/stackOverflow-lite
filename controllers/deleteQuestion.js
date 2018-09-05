import db from '../db';

const deleteQuestion = (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  return db.task('delete', db => db.questions.findById(questionId)
    .then((question) => {
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
      } else if (question.user_id !== userId) {
        return res.status(401).json({
          success: 'false',
          message: 'unauthorized to delete this question'
        })
      }
    })
    .catch((err) => {
      res.status(404).json({
        success: 'false',
        message: 'question does not exist in the database',
      });
    }));
};

export default deleteQuestion;
