const express = require("express"); //  Imports the Express framework

const router = express.Router(); // Create a new router instance

router.get("/users", (req, res) => {
  //Define route for getting all users
});

router.get("/users/:userId", (req, res) => {
  //Define route for getting a specific user by ID
});

router.post("/users", (req, res) => {
  //Define route for creating a new user
});

module.exports = router;
