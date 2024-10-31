const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const { port } = require("./config/config");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
connectDB();

const favoriteCitiesRoutes = require("./routes/favoriteCitiesRoutes");
app.use("/api/favorites", favoriteCitiesRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

/**
 * Unknown endpoint middleware
 */
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});