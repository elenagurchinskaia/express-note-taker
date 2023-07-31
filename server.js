// ================================  Import required packages  ================================== //
// require
const express = require("express");
const fs = require("fs");
const path = require("path");

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

// route for post = when used wants to make a new note
// > POST/api/notes
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
