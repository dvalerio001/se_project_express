require("dotenv").config();
const express = require("express"); //  Imports the Express framework
const mongoose = require("mongoose"); // Import mongoose
const cors = require("cors"); // Import cors
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const { NotFoundError } = require("./errors");
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
app.use(cors());

// Request logger - before all route handlers
app.use(requestLogger);

// remove after review
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", mainRouter);

// Handle 404 errors for non-existent routes
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

// Error logger - must come after routes and before error handlers
app.use(errorLogger);

// Celebrate error handler
app.use(errors());

// Central error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
