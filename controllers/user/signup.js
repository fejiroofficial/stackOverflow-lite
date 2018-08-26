import jwt from 'jsonwebtoken';
import db from '../../db';

const signup = (req, res) => {
  let { firstname, lastname, email } = req.body;
  const { password } = req.body;
  firstname = firstname ? firstname.toString().trim() : firstname;
  lastname = lastname ? lastname.toString().trim() : lastname;
  email = email ? email.toString().trim() : email;

  return db.task("signup", t => t.users.findByEmail(email)
    .then((result) => {
      if (result) {
        return res.status(409).json({
          status: "fail",
          message: "user with this email already exists",
        });
      }

      return t.users.create({ firstname, lastname, email, password })
        .then((user) => {
          const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "24hrs" });
          res.status(201).json({
            status: "success",
            message: "Account created successfully",
            user,
            token,
          });
        });
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({
        status: "fail",
        message: "unable to create user account",
      });
    }));
};

export default signup;
