import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../db';

const signin = (req, res) => {
  let { email } = req.body;
  const { password } = req.body;
  email = email && email.toString().trim();

  return db.task('signin', data => data.users.findByEmail(email)
  .then((user) => {
    const allowEntry = bcrypt.compareSync(password, user.password);
    if (!allowEntry){
      return res.status(401).json({
        success: 'false',
        message: 'wrong email or password'
      });
    }
    const user_details = { ...user };
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
    res.status(200).json({
      success: 'true',
      message: 'Login was successful',
      user_details,
      token,
    });
  }))
  .catch((err) => {
    return res.status(401).json({
      success: 'false',
      message: 'unable to login, wrong email or password!'
    });
  });
};

export default signin;
