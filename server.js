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

// Define data schemas (document formatting)
const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  accessToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const statisticsSchema = new mongoose.Schema({
  username: {
    type: String
  },
  contributions: {
    type: Number
  }
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags:  {
    type: Array,
  },
  images:{
    type: Array
  }
});

const User = mongoose.model("User", userSchema);

const forumPost = mongoose.model("forumPosts", postSchema);

const Stats = mongoose.model("statistics", statisticsSchema);

app.use(express.json());

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, "dist/hammy-huddle/browser")));

// Token Helper Functions
const generateAccessToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.sendStatus(401);

  try {
    const user = await User.findOne({ accessToken: token });
    if (!user) return res.sendStatus(403);

    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(500).json({ message: error.message });
  }
};

// ------------------- API ROUTING -------------------
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken();
    user.accessToken = accessToken;
    await user.save();

    res.status(200).json({ username: user.username, accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    const newStats = new Stats({
      username,
      contributions: 0
    });
    const savedStats = await newStats.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/forumPost", authenticateToken, async (req, res) => {
  const { title, content, tags, images} = req.body;
  const author = req.user.username;

  try {

    const userStats = await Stats.findOne({"username": author});

    const postId = author + userStats.contributions;

    const newPost = new forumPost({
      title,
      author,
      postId,
      content,
      tags, 
      images
    });

    const updatedStats = await Stats.findOneAndUpdate({"username": author}, {$inc:{contributions: 1}});

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/getForumPosts", async (req, res) =>{
  try {
    const posts = await forumPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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