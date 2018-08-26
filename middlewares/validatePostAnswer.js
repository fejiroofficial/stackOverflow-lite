/**
 * validates a new question.
 * @param {any} req.
 * @param {object} res.
 * @param {object} next.
 * @returns {void}
 */

const signinError = (message) => {
  const err = Error(message);
  err.statusCode = 400;
  return err;
}; 

const validatePostAnswer = (req, res, next) => {
  let { answer } = req.body;
  answer = answer && answer.toString().trim();

  if (!answer) return next(signinError("Answer is required"));
  if (answer === '') return next(signinError("Answer field cannot be empty"));

  return next();
}

export default validatePostAnswer;
