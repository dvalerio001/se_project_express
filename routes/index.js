const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { getItems } = require("../controllers/clothingItems");

const auth = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");

const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");

// Public
router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserBody, createUser);
router.get("/items", getItems);

// Protected
router.use("/users", auth, userRouter);
router.use("/items", auth, clothingItemRouter);

module.exports = router;
