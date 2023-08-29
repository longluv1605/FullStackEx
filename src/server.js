const express = require("express");
const app = express();
const date = new Date();
const cors = require("cors");

// for ex 3.7
const morgan = require("morgan");
app.use(morgan("tiny"));
app.use(cors());

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/", (request, response) => {
    response.send("<h1>FullStackEx</h1>");
});

// 3.1
app.get("/api/persons", (request, response) => {
    response.json(persons);
});

// 3.2
app.get("/info", (request, response) => {
    response.send(`<br>Phonebook has info for ${persons.length} people</br>
                    <br>${date.toUTCString()}</br>`);
});

// 3.3
app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);

    if (!person) {
        response.status(404).end();
    } else {
        response.json(person);
    }
});

// 3.4
app.delete("/delete/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);

    console.log(persons);

    response.status(204).end();
});

// 3.5
app.post("/api/persons", (request, response) => {
    try {
        const id = Math.floor(Math.random() * 1000);
        let name = `Person ${id}`;
        const number = `${Math.floor(Math.random() * 100)}-${Math.floor(
            Math.random() * 100
        )}-${Math.floor(Math.random() * 10000000)}`;

        const existed = persons.find((person) => person.name === name);

        if (existed) {
            throw new Error("name must be unique");
        }
        if (!name && !number) {
            throw new Error("missing name and number");
        }
        if (!name) {
            throw new Error("missing name");
        }
        if (!number) {
            throw new Error("missing number");
        }

        const person = {
            id: id,
            name: name,
            number: number,
        };

        persons = persons.concat(person);
        console.log(persons);
        response.json(person);
    } catch (error) {
        console.log(error.message);
        response.status(404).end(error.toString());
    }
});

// 3.7

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
