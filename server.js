// ================================  Import required packages  ================================== //
const express = require("express");
const path = require("path");
const app = express();
const api = require("./routes/index.js");
const PORT = 3000;
// refer to the PORT

// boiler plate info
// set route to dp.json file
// > GET /api/notes

// ================================  Middleware to parse incoming data  ================================== //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use(express.static("public"));

// ================================  Global array to store notes  ================================== //

let notes = [];

// ================================  Routes  ================================== //
// route for index.html (Landing Page)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// > GET *
// route to note.html
// > GET/notes
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

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
