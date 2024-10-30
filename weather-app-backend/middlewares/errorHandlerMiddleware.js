const errorHandler = (error, req, res, next) => {
  console.error("Error: ", error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  res.status(error.status || 500).json({
    message: error.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
