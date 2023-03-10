// Basic express server
import express, { Request } from 'express';
import methodOverride from 'method-override';
import { Client } from 'pg';

const app = express();
const port = 3000;


app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main() {
  const client = new Client('postgres://postgres:password@localhost:5432/notes')
  await client.connect()

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/notes', async (req, res) => {

    const { rows } = await client.query('SELECT * FROM note')

    res.send(`
      <h1>Notes</h1>
      <ul>
        ${rows
          .map(
            (note, index) => `
          <form method="POST" action="/notes/${note.id}?_method=DELETE">
            <li>
              ${note.value}
              <button type="submit">X</button>
            </li>
          </form>
        `,
          )
          .join('')}
      </ul>
      <form method="POST">
        <input name="note" autofocus />
        <button type="submit">Add Note</button>
      </form>
      `);
  });

  app.post('/notes', async (req, res) => {
    await client.query('INSERT INTO note (value) VALUES ($1)', [req.body.note])
    res.redirect('/notes');
  });

  app.delete('/notes/:index', async (req: Request<{ index: number }>, res) => {
    await client.query('DELETE FROM note WHERE id = $1', [req.params.index])
    res.redirect('/notes');
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

main();
