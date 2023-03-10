// Basic express server
import express, { Request } from 'express';
import methodOverride from 'method-override';

const app = express();
const port = 3000;

const notes: string[] = [];

app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main() {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  app.get('/notes', async (req, res) => {
  // renders the notes with a delete button for each note using form delete method action /notes/:index
  
    res.send(`
      <h1>Notes</h1>
      <ul>
        ${notes.map((note, index) => `
          <form method="POST" action="/notes/${index}?_method=DELETE">
            <li>
              ${note}
              <button type="submit">X</button>
            </li>
          </form>
        `).join('')}
      </ul>
      <form method="POST">
        <input name="note" autofocus />
        <button type="submit">Add Note</button>
      </form>
      `);
  });
  
  app.post('/notes', async (req, res) => {
    notes.push(req.body.note);
    res.redirect('/notes');
  });
  
  app.delete('/notes/:index', async (req: Request<{ index: number }>, res) => {
    notes.splice(req.params.index, 1);
    res.redirect('/notes');
  });
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

main();
