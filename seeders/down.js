import db from '../db';

const down = () => {
  db.none('DELETE FROM users; DELETE FROM questions; DELETE FROM answers;')
    .then(() => {
      console.log('Undo questions, users and answers seeds successfull');
    })
    .catch((err) => {
      console.log(err);
    });
};

down();
