const db = require('./db/connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};


const getStories = () => {
  return db.query('SELECT * FROM users;')
  .then(data => {
    return data.rows;
  });
};

module.exports = { getUsers, getStories };
