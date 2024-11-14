const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { getItems } = require("../controllers/clothingItems"); // Add this line

const auth = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");

// Public
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", getItems); // Fixed this line

// Protected
router.use("/users", auth, userRouter);
router.use("/items", auth, clothingItemRouter);

module.exports = router;
