const signinError = (message) => {
  const err = Error(message);
  err.statusCode = 400;
  return err;
};

const validateSignin = (req, res, next) => {
  let { email, password } = req.body;
  email = email && email.toString().trim();
  password = password && password.toString();

  if (!email && !password) return next(signinError("Email and Password are required"));
  if (!email) return next(signinError("Email is required"));
  if (!password) return next(signinError("Password is required"));
  if (password.trim() === '') return next(signinError("Password cannot be empty"));

  return next();
} 

export default validateSignin;
