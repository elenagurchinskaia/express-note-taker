// ================================  Import required packages  ================================== //
// require
const express = require("express");
const fs = require("fs");
const path = require("path");
// https://uuidonline.com/
// uuid - to export an obj w/different uuid versions, and v4 to generate a random uuid
// extract the v4 function from the uuid and rename it as uuidv4
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
      return (
        req
          // server-side error 500
          .statusCode(500)
          .json({ error: "Error reading notes from the database." })
      );
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
    return (
      res
        // bad request - contains invalid data
        .status(400)
        .json({ error: "Please, provide a valid title and text for the note." })
    );
  }
  // fs read-file
  fs.readFile(dbFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return (
        res
          // server-side error 500
          .status(500)
          .json({ error: "Error reading notes from the database" })
      );
    }
    const notes = JSON.parse(data);
    const newNote = {
      // generate a unique id for each note that a user inputs
      id: uuidv4(),
      title,
      text,
    };
    // push the content
    notes.push(newNote);
  });
  // fs write-file
  fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
    if (err) {
      console.error(err);
      return (
        res
          // server-side error 500
          .status(500)
          .json({ error: "Error writing note to the database." })
      );
    }
    res.json(newNote);
  });
});

// ================================  DELETE Route (to delete a note by ID) ================================== //

// optional: route for delete > delete posted info based on ID
// > DELETE /api/notes/:id
app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  // read file
  fs.readFile(dbFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error reading notes from the database." });
    }
    const notes = JSON.parse(data);
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    // write file
    fs.writeFile(dbFilePath, JSON.stringify(filteredNotes), (err) => {
      if (err) {
        console.error(err);
        return (
          res
            // server-side error 500
            .status(500)
            .json({ error: "Error writing notes to the database" })
        );
      }
      res.json({ message: "Note deleted successfully." });
    });
  });
});

// server-side
// > const from activities

// ================================  Import public folder, html routes  ================================== //

// look at 22 solved

// ================================  Main server listen  ================================== //

// listen on port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
