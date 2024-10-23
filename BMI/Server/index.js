const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/bmiApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("DB connection error", err));

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  bmiData: [
    {
      height: Number,
      weight: Number,
      bmi: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});
const User = mongoose.model("User", userSchema);

// Register new user (admin)
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.send("User registered");
});

// Login user and generate JWT
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ userId: user._id }, "secretKey", {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, "secretKey");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

// Input BMI data
app.post("/bmi", authenticateToken, async (req, res) => {
  const { height, weight } = req.body;
  const bmi = weight / ((height / 100) * (height / 100));
  const user = await User.findById(req.user.userId);
  user.bmiData.push({ height, weight, bmi });
  await user.save();
  res.send("BMI data saved");
});

// Get BMI results
app.get("/bmi", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user.bmiData.sort((a, b) => b.date - a.date));
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
