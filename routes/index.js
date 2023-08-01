// handle the setup of the server, middleware, and routing

const router = require("express").Router();

const notesRouter = require("./notes");
// const path = require("path");

// const app = express();
router.use("/notes", notesRouter);

module.exports = router;
