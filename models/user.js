import bcrypt from 'bcrypt';

export default class User {
  constructor(db) {
    this.db = db;
  }

  // create new user
  create(values) {
    values.password = bcrypt.hashSync(values.password, 10);
    const sql = "INSERT INTO users(firstname, lastname, email, password) VAlUES(${firstname}, ${lastname}, ${email}, ${password}) RETURNING id, 'firstname', 'lastname', email";
    return this.db.one(sql, values);
  }

  // find user by id
  findById(id) {
    const sql = "SELECT * FROM users WHERE id = $1";
    return this.db.oneOrNone(sql, id);
  }

  // find user by email
  findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = $1";
    return this.db.oneOrNone(sql, email);
  }
}