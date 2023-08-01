// handle the api routes, such as GET, POST to retrieve and save notes from and to the db.json file, as well as DELETE to request to delete a specific note by it's id.

const router = require("express").Router;
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
