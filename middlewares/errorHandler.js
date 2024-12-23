const errorHandler = (err, req, res, next) => {
  // Log error details to console for debugging
  console.error("Error:", err);

  // Get status code from error or default to 500
  const statusCode = err.statusCode || 500;
  const message = err.message || "An error occurred on the server";

  res.status(statusCode).send({ message });
};

module.exports = errorHandler;
