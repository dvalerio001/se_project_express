const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const auth = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");

//Public
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", require("./clothingItems").getItems);

//Protected
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

module.exports = router;
