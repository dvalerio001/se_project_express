const express = require("express"); //  Imports the Express framework
const { getUsers, getUser, createUser } = require("../controllers/users");

const router = express.Router(); // Create a new router instance

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);

module.exports = router;
