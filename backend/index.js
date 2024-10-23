const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost/weather-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Admin schema and model
const AdminSchema = new mongoose.Schema({ username: String, password: String });
const Admin = mongoose.model("Admin", AdminSchema);

// Weather schema and model
const WeatherSchema = new mongoose.Schema({
  location: String,
  temperature: String,
  condition: String,
});
const Weather = mongoose.model("Weather", WeatherSchema);

// Register admin
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ username, password: hashedPassword });
  await newAdmin.save();
  res.send("Admin registered");
});

// Admin login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).send("Invalid credentials");

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ adminId: admin._id }, "secret");
  res.json({ token });
});

// Create weather entry
app.post("/weather", authenticateToken, async (req, res) => {
  const { location, temperature, condition } = req.body;
  const newWeather = new Weather({ location, temperature, condition });
  await newWeather.save();
  res.send("Weather data saved");
});

// Get all weather entries
app.get("/weather", async (req, res) => {
  const weatherData = await Weather.find();
  res.json(weatherData);
});

// Middleware to verify token
function authenticateToken(req, res, next) {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, "secret");
    req.admin = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

// Server listening
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
