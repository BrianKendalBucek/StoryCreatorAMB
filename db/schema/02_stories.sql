DROP TABLE IF EXISTS stories CASCADE;
CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT,
  content TEXT,
  completed BOOLEAN,
  votes INTEGER,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created TIMESTAMP
);
