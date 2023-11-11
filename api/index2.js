const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 8080;

// Sequelize setup
const Sequelize = require("sequelize");
const sequelize = new Sequelize("your-database-name", "your-username", "your-password", {
  host: "localhost",
  dialect: "mysql",
});

// Models
const { User, Message } = require("./models");

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/"); // Specify the desired destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Database synchronization
sequelize.sync().then(() => {
  console.log("Connected to MySQL");
});

// Define routes

// Registration
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, image } = req.body;

    const newUser = await User.create({ name, email, password, image });

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering the user!" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password!" });
    }

    const token = createToken(user.id);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in finding the user", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create token
const createToken = (userId) => {
  const payload = {
    userId: userId,
  };

  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });
  return token;
};

// Define other routes as needed, such as messages, friend requests, etc.

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
