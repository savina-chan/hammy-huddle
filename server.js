require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { type } = require("os");
const app = express();

// Manage DB connection
mongoose.connect(process.env.MONGO_URI, {});
const database = mongoose.connection;
database.on("error", (error) =>
  console.error("Database connection error:", error),
);
database.once("open", () => console.log("Database connected"));

app.use(express.json());

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, "dist/hammy-huddle/browser")));

// Server static files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/hammy-huddle/browser/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});