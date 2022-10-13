const db = require('./db/connection');

const getUser = (username) => {
  return db.query('SELECT * FROM users WHERE name = $1;', [username])
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

const getUserStories = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUser, getStories, getUserStories };
