export default class Answer {
    constructor(db) {
        this.db = db;
    }
    //post an answer to a question
    create(values) {
        const sql = "INSERT INTO answers (question_id, answer) VALUES(${questionId}, ${answer}) RETURNING *";
        return this.db.one(sql, values);
    }
    //return all answers belonging to a question 
    all(question_id) {
        const sql = "SELECT * FROM answers WHERE question_id = $1";
        return this.db.any(sql, question_id)
    }
    //delete answer;
    remove(id) {
    const sql = "DELETE FROM answers WHERE id = $1 RETURNING *";
    return this.db.oneOrNone(sql, id);
  }
}
