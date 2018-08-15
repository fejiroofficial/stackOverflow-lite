const validatePostQuestion = (req, res, next) => {
    let { title, body } = req.body;
  
    title = title && title.toString().trim();
    body = body && body.toString().trim();
    if (!title) {
      const err = new Error('Title is required');
      err.statusCode = 400;
      return next(err);
    }
    if (!body) {
        const err = new Error('body is required');
        err.statusCode = 400;
        return next(err);
      }
    
    return next(); 
  }
  
  export default validatePostQuestion;