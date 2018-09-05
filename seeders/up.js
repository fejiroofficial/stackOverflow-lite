import bcrypt from 'bcrypt';
import db from '../db';

const users = [
  {
    id: 1,
    firstname: 'Okeoghene',
    lastname: 'Gospel',
    email: 'oke@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    id: 2,
    firstname: 'Elooghene',
    lastname: 'Gospel',
    email: 'elo@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

const questions = [
  {
    id: 1,
    userId: 1,
    questionTitle: 'Who is rocking my boat',
    questionDescription: 'rocking boat, rocking boat',
  },

  {
    id: 2,
    userId: 2,
    questionTitle: 'Rocking chair',
    questionDescription: 'Who is rocking my chair, roccking chair',
  },
];

const answers = [
  {
    id: 1,
    userId: 1,
    questionId: 2,
    answer: 'Oh my answer goes here',
  },

  {
    id: 2,
    userId: 2,
    questionId: 1,
    answer: 'Oh my answer goes here too',
  }
];

const up = () => {
  db.tx((t) => {
    const queries = users
      .map(user => t.none('INSERT INTO users(id, firstname, lastname, email, password) VALUES(${id}, ${firstname}, ${lastname}, ${email}, ${password})', user));
    return t.batch(queries);
  })
    .then(() => {
      console.log('Users seeded successfully');

      db.tx((t) => {
        const queries = questions
          .map(question => t.none('INSERT INTO questions(id, user_id, question_title, question_description) VALUES(${id}, ${userId}, ${questionTitle}, ${questionDescription})', question));
        return t.batch(queries);
      })
        .then(() => {
          console.log('Questions seeded successfully');

          db.tx((t) => {
            const queries = answers
              .map(answer => t.none('INSERT INTO answers(id, user_id, question_id, answer) VALUES(${id}, ${userId}, ${questionId}, ${answer})', answer));
            return t.batch(queries);
          })
            .then(() => {
              console.log('Answers seeded successfully');
            })
            .catch((err) => {
              console.log(err);
            })
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

up();
