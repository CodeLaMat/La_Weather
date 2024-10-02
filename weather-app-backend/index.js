const express = require("express");
const connectDB = require("./config/db");
const { port } = require("./config/config");

const app = express();
app.use(express.json());

connectDB();

// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/favorites", require("./routes/favoriteCitiesRoutes"));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
