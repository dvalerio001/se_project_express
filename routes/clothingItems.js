const router = require("express").Router();

router.get("/items", (req, res) => {
  // Get all clothing items
});

router.post("/items", (req, res) => {
  // Create new item
});

router.delete("/items/:itemId", (req, res) => {
  // Delete item by _id
});

module.exports = router;
