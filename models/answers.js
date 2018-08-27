export default class Answer {
    constructor(db) {
        this.db = db;
    }
    //post an answer to a question
    create(values) {
        const sql = "INSERT INTO answers (user_id, question_id, answer) VALUES(${userId}, ${questionId}, ${answer}) RETURNING *";
        return this.db.one(sql, values);
    }
    // find question by id
    findById(id) {
        const sql = "SELECT * FROM answers WHERE id = $1";
        return this.db.one(sql, id);
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
    //modify answer by id;
    modify(values, id) {
        values.id = id;
        const sql = 'UPDATE answers SET answer=${answer} WHERE id=${id} RETURNING *';
        return this.db.one(sql, values);
  }
}
