
export default class Answer {
    constructor(db) {
      this.db = db;
    } 
    //post an answer to a question
    create(questionId) {
        const sql = "INSERT INTO answers (answer, visibility) VALUES(${answer}) WHERE(allQuestions.id = $1) RETURNING *";
        return this.db.one(sql, values);
    }   
}
