const db = require('./db/connection');

const getUser = (username) => {
  return db.query('SELECT * FROM users WHERE username = $1;', [username])
    .then(data => {
      return data.rows;
    });
};


const getStories = () => {
  const query = `SELECT *  FROM stories
   JOIN contributions ON stories.id = contributions.story_id
   JOIN users ON contributions.user_id = users.id
   LIMIT 10;`
  return db.query(query)
  .then(data => {
    return data.rows;
  });
};

// SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
// FROM reservations
// JOIN properties ON reservations.property_id = properties.id
// JOIN property_reviews ON properties.id = property_reviews.property_id
// WHERE reservations.guest_id = 1
// GROUP BY properties.id, reservations.id
// ORDER BY reservations.start_date
// LIMIT 10;


const getUserStories = (id) => {
  return db.query('SELECT * FROM stories WHERE user_id = $1;', [id])
    .then(data => {
      return data.rows;
    });
};



module.exports = { getUser, getStories, getUserStories };
