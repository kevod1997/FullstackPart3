const express = require("express");
const morgan = require('morgan');

const app = express();

app.use(express.json())

const getBody = (req) => JSON.stringify(req.body);
morgan.token('body', getBody);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));




// Array de objetos con las entradas de la agenda telefónica
let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
  ]

  // Manejador de solicitudes GET para obtener todas las entradas de la agenda telefónica
  app.get("/api/persons", (request, response) => {
    response.json(persons);
  });


  // Manejador de solicitudes GET para obtener información sobre la agenda telefónica
  app.get("/info", (request, response) => {
    const currentTime = new Date();
    response.send(`<p>Phonebook has info for ${persons.length} people </p>
    <p> ${currentTime} </p>
    `);
  });


  // Manejador de solicitudes GET para obtener una entrada de la agenda telefónica por ID
  app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });

  // Función para generar un ID único para una nueva entrada de la agenda telefónica
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post("/api/persons", (request, response) => {
    const body = request.body;
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: "name or number is missing"
      });
    }

    if (persons.find((person) => person.name === body.name)) {
      return response.status(400).json({ 
        error: "name must be unique"
      });
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    };
  
    persons = persons.concat(person);
  
    response.json(person);
  });

  app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
  });

  // const unknownEndpoint = (request, response) => {
  //   response.status(404).send({ error: 'unknown endpoint' })
  // }
  
  // app.use(unknownEndpoint)


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
