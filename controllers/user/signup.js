import jwt from 'jsonwebtoken';
import db from '../../db';

const signup = (req, res) => {
  let { firstname, lastname, email } = req.body;
  const { password } = req.body;
  firstname = firstname ? firstname.toString().trim() : firstname;
  lastname = lastname ? lastname.toString().trim() : lastname;
  email = email ? email.toString().trim() : email;

  return db.task('signup', db => db.users.findByEmail(email)
    .then((result) => {
      if (result) {
        return res.status(409).json({
          success: 'false',
          message: 'user with this email already exists',
        });
      }

      return db.users.create({ firstname, lastname, email, password })
        .then((user) => {
          const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
          const user_details = { ...user };
          res.status(201).json({
            success: 'true',
            message: 'Account created successfully',
            user_details,
            token,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        success: 'false',
        message: 'unable to create user account',
      });
    }));
};

export default signup;
