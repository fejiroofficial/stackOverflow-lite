
export default class Question {
  constructor(db) {
    this.db = db;
  }

  //create a new question
  create(values) {
    const sql = "INSERT INTO allQuestions (questionTitle, questionDescription, visibility) VALUES(${questionTitle}, ${questionDescription}) RETURNING *";
    return this.db.one(sql, values);
  }
  // find question by id
  findById(id) {
    const sql = "SELECT * FROM allQuestions WHERE id = $1";
    return this.db.one(sql, values);
  }
  //delete question;
  remove(id) {
    const sql = "DELETE FROM allQuestions WHERE id = $1 RETURNING *";
    return this.db.oneOrNone(sql, id);
  }
  //returns all questions belonging to a user
  all(userId) {
    const sql = "SELECT * FROM allquestions WHERE userId = $1";
    return this.db.one(sql, userId);
  }  
}
