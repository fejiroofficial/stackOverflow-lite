const validatePostQuestion = (req, res, next) => {
    let { questionTitle, questionDescription } = req.body;
  
    questionTitle = questionTitle && questionTitle.toString().trim();
    questionDescription = questionDescription && questionDescription.toString().trim();
    if (!questionTitle && !questionDescription) {
      const err = new Error('Title is required');
      err.statusCode = 400;
      return next(err);
    }
    return next(); 
  }
  
  export default validatePostQuestion;