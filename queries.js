const db = require('./db/connection');

const getUser = (username) => {
  return db.query('SELECT * FROM users WHERE username = $1;', [username])
    .then(data => {
      return data.rows;
    });
};

// LEFT JOIN contributions ON stories.id = contributions.story_id

const getStories = () => {
  const query = `SELECT *  FROM stories
    JOIN users ON stories.author_id = users.id
    JOIN contributions ON stories.id = contributions.story_id
   ORDER BY stories.id;`
  return db.query(query)
  .then(data => {
    // console.log("++++++++++++", data.rows);
    return data.rows;
    });
};

// LEFT JOIN contributions ON stories.id = contributions.story_id

const getUserStories = (id) => {

  const query = `SELECT * FROM stories
  JOIN users ON stories.author_id = users.id
  JOIN contributions ON stories.id = contributions.story_id
   WHERE stories.author_id = $1
   ORDER BY stories.id;`

  return db.query(query, [id])
    .then(data => {
      // console.log("**************", data.rows);
      // console.log("______________");
      return data.rows;
    });
};

const createStory = (story) => {

  const createStoryQuery =
  `INSERT INTO stories (title, content, author_id)
  VALUES ($1, $2, $3) RETURNING *;`;

  const info = [
    story.title,
    story.content,
    story.author_id
  ];

  return db.query(createStoryQuery, info)
    .then(res => res.rows[0]);
};

const updateStory = (id) => {
  const query = `
  UPDATE stories
  SET
  completed = true
   WHERE id = $1
   RETURNING *
  `
  return db.query(query, [id])
    .then(data => {
      return data.rows[0];
    })
}


module.exports = { getUser, getStories, getUserStories, createStory, updateStory };
