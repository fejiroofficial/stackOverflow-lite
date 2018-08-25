import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../db';

const signin = (req, res) => {
  let { email } = req.body;
  const { password } = req.body;
  email = email && email.toString().trim();

  return db.task("signin", t => t.users.findByEmail(email)
  .then((user) => {
    if(!user){
      return res.status(401).json({
        status: "fail",
        message: "wrong email or password"
      });     
    }
    const allowEntry = bcrypt.compareSync(password, user.password);
    if (!allowEntry){
      return res.status(401).json({
        status: "fail",
        message: "wrong email or password"
      });
    }
    const user_details = { ...user };
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "24hrs" });
    res.status(200).json({
      status: "success",
      message: "Login was successful",
      user_details,
      token,
    });
  }))
  .catch((err) => {
    return res.status(500).json({
      status: "fail",
      message: "unable to login, try again!"
    });
  });
};

export default signin;

