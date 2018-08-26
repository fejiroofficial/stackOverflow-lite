/**
 * validates a new question.
 * @param {any} req.
 * @param {object} res.
 * @param {object} next.
 * @returns {void}.
 */

const signinError = (message) => {
  const err = Error(message);
  err.statusCode = 400;
  return err;
}; 

const validatePostQuestion = (req, res, next) => {
  let { questionTitle, questionDescription } = req.body;
  questionTitle = questionTitle && questionTitle.toString().trim();
  questionDescription = questionDescription && questionDescription.toString().trim();

  if (!questionTitle && !questionDescription) return next(signinError("Title and description are required"));
  if (!questionTitle) return next(signinError("Title is required"));
  if (questionTitle === '') return next(signinError("Title cannot be empty"));
  if (!questionDescription) return next(signinError("Description is required"));
  if (questionDescription === '') return next(signinError("description cannot be empty"));

  return next();
}

export default validatePostQuestion;
