// ================================  Import required packages  ================================== //

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const routes = require("./routes/index.js");
// const notesRouter = require("./routes/notes.js");

// ================================  Middleware to parse incoming data  ================================== //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// use the routes defined in index.js
app.use("/api", routes);
// use the notesRouter for notes-related routes
// app.use("/notes", notesRouter);

// ================================  GET Route for homepage ================================== //

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// look at 22 solved

// ================================  Main server listen  ================================== //

// listen on port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
