const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/emi-calculator", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// EMI Schema
const emiSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  principal: Number,
  rate: Number,
  time: Number,
  emi: Number,
  date: { type: Date, default: Date.now },
});

const Emi = mongoose.model("Emi", emiSchema);

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "User registered successfully!" });
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, "your_jwt_secret");
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// EMI input endpoint
app.post("/emi", async (req, res) => {
  const { principal, rate, time, emi } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "your_jwt_secret");

  const emiEntry = new Emi({ userId: decoded.id, principal, rate, time, emi });
  await emiEntry.save();
  res.status(201).json({ message: "EMI data saved successfully!" });
});

// Get EMI results endpoint
app.get("/emi", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "your_jwt_secret");

  const emiResults = await Emi.find({ userId: decoded.id }).sort({ date: -1 });
  res.json(emiResults);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
