// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config(); // Load variables from .env file
app.use("/uploads", express.static("../uploads")); // Serve static files from the 'uploads' directory
app.use(cors()); // Allow requests from all origins

app.use(express.json()); // JSON parsing middleware
// Connect to MongoDB using the environment variable
// console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
// console.log(process.env.MONGODB_URI);
// Routes
const uploadRoutes = require("./uploadHandler");
const imageRoutes = require("./imageRoutes");

app.use("/upload", uploadRoutes);
app.use("/images", imageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// const PORT = 5000;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
