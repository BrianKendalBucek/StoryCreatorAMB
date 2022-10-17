DROP TABLE IF EXISTS stories CASCADE;
CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT,
  content TEXT,
  completed BOOLEAN,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  votes INTEGER
);
