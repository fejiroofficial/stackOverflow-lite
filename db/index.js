/* eslint no-param-reassign: "off" */

import path from 'path';
import promise from 'bluebird';
import pgp, { QueryFile } from 'pg-promise';
import setup from '../config/config.json';
import User from '../models/user';
import Question from '../models/questions';
import Answer from '../models/answers';

const sql = (file) => {
  // generate full path
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
};

// pg-promise initialization options
const initOptions = {
  promiseLib: promise,
  extend(obj) {
    obj.users = new User(obj);
    obj.questions = new Question(obj);
    obj.answers = new Answer(obj);
  },
};

const env = process.env.NODE_ENV || "test";
const config = setup[env];

let $db;

// check if env is production
if (config.use_env_variable) {
  $db = pgp(initOptions)(process.env[config.use_env_variable]);
} else {
  $db = pgp(initOptions)(config);
}

const db = $db;

db
  .query(sql('./stackoverflow.sql'))
  .then(() => {
    console.log("Database successfully initialized");
  })
  .catch((err) => {
    console.log(err);
  });

export default db;
