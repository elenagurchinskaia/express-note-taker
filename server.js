// ================================  Import required packages  ================================== //
// require
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const api = require("./routes/index.js");
// instance of express
const app = express();
const PORT = 3000;
// refer to the PORT

// boiler plate info
// set route to dp.json file
// > GET /api/notes

// ================================  Middleware to parse incoming data  ================================== //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", api);

// ================================  Global array to store notes  ================================== //

let notes = [];

// ================================  File path for the db.json file  ================================== //

const dbFilePath = path.join(__dirname, "db", "db.json");

// ================================  GET Routes  ================================== //

// route for index.html (Landing Page)
// > GET *
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets/index.html"));
});
// route to note.html
// > GET/notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets/notes.html"));
});
// route for saved notes as json
app.get("/api/notes", (req, res) => {
  fs.readFile(dbFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return req
        .statusCode(500)
        .json({ error: "Error reading notes from the database." });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// ================================  POST Routes  ================================== //

// post route to add a new note
// > POST/api/notes
app.post("/api/notes", (req, res) => {
  // log that a POST request was received
  console.log(`${req.method} request received to add the new note`);
  // destructuring assignment for the items in req.body
  const { title, text } = req.body;
  // if all the required properties are present
  if (!title || !text) {
    return res
      .status(400)
      .json({ error: "Please, provide a valid title and text for the note." });
  }
  // fs read-file
  fs.readFile();
  // fs write-file
});
// optional: route for delete > delete posted info based on ID
// > DELETE /api/notes/:id
// listen on port

// server-side
// > const from activities

// ================================  Import public folder, html routes  ================================== //

// look at 22 solved

// ================================  Main server listen  ================================== //

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
