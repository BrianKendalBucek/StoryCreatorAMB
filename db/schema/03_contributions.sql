DROP TABLE IF EXISTS contributions CASCADE;
CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  content TEXT,
  created TIMESTAMP,
  status BOOLEAN,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
);
