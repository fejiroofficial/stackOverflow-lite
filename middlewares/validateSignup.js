const signupError = (message) => {
    const err = Error(message);
    err.statusCode = 400;
    return err;
  };
  
  
  const validateSignup = (req, res, next) => {
    let { email, password, firstname, lastname } = req.body;
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    email = email && email.toString().trim();
    firstname = firstname && firstname.toString().trim();
    lastname = lastname && lastname.toString().trim();
    password = password && password.toString();
  
    if (!email && !password) return next(signupError("Email and Password are required"));
  
    if (!email) return next(signupError("Email is required"));
    if (!emailRegex.test(email)) return next(signupError("Email is not valid"));
    if (!password) return next(signupError("Password is required"));
    if (password.trim() === '') return next(signupError("Password cannot be empty"));
    if (password.length < 6) return next(signupError("Password must be minimum of 6 characters"));

    if (!firstname && !lastname) return next(signupError("Firstname and lastname is required"));
    if (!firstname) return next(signupError("firstname is required"));
    if (firstname && firstname.length < 3) return next(signupError("firstname must be minimum of 3 characters"));

    if (!lastname) return next(signupError("lastname is required"));
    if (lastname && lastname.length < 3) return next(signupError("lastname must be minimum of 3 characters"));
  
    // if all fields pass all conditions
    return next();
  };
  
  export default validateSignup;
