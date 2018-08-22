const validatePostAnswer = (req, res, next) => {
    let { answer } = req.body;
  
    answer = answer && answer.toString().trim();
    if (!answer) {
      const err = new Error("Answer is required");
      err.statusCode = 400;
      return next(err);
    }
    return next(); 
  }
  
  export default validatePostAnswer;