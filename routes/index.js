// handle the setup of the server, middleware, and routing

const router = require("express");
const app = require("express").Router();

// import the route modules
const notesRouter = require("./routes/notes");

// use route modules
app.use("/notes", notesRouter);
// app.use("/api", apiRoute);

// listen app
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is runing on http://localhost:${PORT}");
});
