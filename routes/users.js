const express = require("express");
const { getUser } = require("../controllers/users");
const router = express.Router();
router.get("/:userId", getUser);

module.exports = router;
