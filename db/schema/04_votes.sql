DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  contribution_id INTEGER REFERENCES contributions(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created TIMESTAMP
);

-- const addVote = (contributionID, userID) => {
--   const queryString = `INSERT INTO votes (contribution_id, user_id)
--   VALUES ($1, $2)
--   RETURNING *;`
--   return db.query(queryString, [contribution_id, user_id])
-- }

-- const getVotes = (contributionID) => {
--   const queryString = `SELECT COUNT(*) FROM votes
--   WHERE contribution_id = $1;`
--   return db.query(queryString, [contributionID])
-- }
