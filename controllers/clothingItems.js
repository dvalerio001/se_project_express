const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data provided" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Item not found" });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Item not found" });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Item not found" });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
