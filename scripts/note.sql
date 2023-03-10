-- using postgresql

-- connecting to a database
-- const client = new Client('postgres://postgres:password@localhost:5432/notes')
-- await client.connect()

-- create a database called notes
CREATE DATABASE notes;

-- create a table called note with auto incrementing id
CREATE TABLE note (
  id SERIAL PRIMARY KEY,
  value TEXT NOT NULL
);

-- select all notes
SELECT * FROM note;
-- const { rows } = await client.query('SELECT * FROM note')

-- insert a note with $1
INSERT INTO note (value) VALUES ($1);
-- await client.query('INSERT INTO note (value) VALUES ($1)', [req.body.note])

-- delete a note with $1
DELETE FROM note WHERE id = $1;
-- await client.query('DELETE FROM note WHERE id = $1', [req.params.index])


