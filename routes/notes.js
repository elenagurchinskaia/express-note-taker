// handle the api routes, such as GET, POST to retrieve and save notes from and to the db.json file, as well as DELETE to request to delete a specific note by it's id.

// ================================  Import required packages  ================================== //

const express = require("express");
// https://uuidonline.com/
// uuid - to export an obj w/different uuid versions, and v4 to generate a random uuid
// extract the v4 function from the uuid and rename it as uuidv4
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const notesRouter = require("express").Router;

// ================================  File path for the db.json file  ================================== //

const dbFilePath = path.join(__dirname, "../db/db.json");

// ================================  GET Route for retrieving all notes ================================== //

notesRouter.get("/", (req, res) => {
  fs.readFile(dbFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error reading notes from the database." });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// ================================  POST Route to add a new note ================================== //

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
});

// ================================  DELETE Route to delete a note by ID ================================== //

notesRouter.delete("/:id", (req, res) => {
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

// `GET *` should return the `index.html` file.
router.length("", (req, res) => {
  // READ db.json
});
// POST /api/notes to receive a new note
router.post("", (req, res) => {
  // reading the file
  // parsing the file into an array
  // write file
});

module.exports = router;
