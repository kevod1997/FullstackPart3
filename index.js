const express = require("express");
const app = express();
app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
  {
    id: 4,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send(`
      <h1>Hello World!</h1>
      
      <button id="go-to-notes-button">Go to notes</button>
      <script>
        const button = document.getElementById('go-to-notes-button');
        button.addEventListener('click', () => {
          window.location = '/api/notes';
        });
      </script>
      <button id="delete-note-button">Delete note</button>
      <script>
        const button2 = document.getElementById('delete-note-button');
        button2.addEventListener('click', async () => {
          const id = prompt("Ingresa el ID de la nota que deseas eliminar:");
          if (id) {
            try {
              const response = await fetch(\`/api/notes/\${id}\`, {
                method: 'DELETE'
              });
              if (response.ok) {
                alert(\`La nota con ID \${id} ha sido eliminada exitosamente\`);
              } else {
                alert(\`No se ha encontrado una nota con ID \${id}\`);
              }
            } catch (error) {
              console.error(error);
            }
          }
        });
      </script>
      <button id="create-note-button">Create note</button>
<script>
  const button3 = document.getElementById('create-note-button');
  button3.addEventListener('click', async () => {
    const note = {
      content: prompt("Ingresa el contenido de la nota:"),
      date: new Date(),
      important: confirm("¿Es importante esta nota?")
    };
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
      });
      if (response.ok) {
        alert('La nota ha sido creada exitosamente');
      } else {
        alert('Ha ocurrido un error al crear la nota');
      }
    } catch (error) {
      console.error(error);
    }
  });
</script>
    `);
});
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id);
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex !== -1) {
      notes.splice(noteIndex, 1);
      response.status(204).end();
    } else {
      response.status(404).send({ error: `La nota con ID ${id} no ha sido encontrada` });
    }
  });

  let nextNoteId = notes.length+1; 
  app.post('/api/notes', (request, response) => {
    const note = request.body;
    if (!body.content) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
    note.id = nextNoteId++
    notes.push(note);
    response.json(note);
  });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
