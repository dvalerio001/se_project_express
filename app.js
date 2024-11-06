const express = require("express"); //  Imports the Express framework
const mongoose = require("mongoose"); // Import mongoose
const mainRouter = require("./routes");

const app = express(); //  Creates an Express application instance

const { PORT = 3001 } = process.env; // Sets the port using environment variables with a default of 3001

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error); // Connect to MongoDB server

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "672af7b158187b3c6c88807f", // from postman test
  };
  next();
});
app.use("/", mainRouter);

// Handle 404 errors for non-existent routes
app.use((req, res) => {
  // Middleware for handling non-existent routes
  res.status(404).send({
    // Send 404 status code and error message
    message: "Requested resource not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
