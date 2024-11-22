require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // Import auth routes

// Initialize Passport strategies
require("./config/passportGoogle");
require("./config/passportApple");

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Session management
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // MongoDB connection for session store
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1-day cookie lifespan
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
const connectDB = require("./config/db");
connectDB();

// Routes
app.use("/auth", authRoutes); // Use auth routes

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Authentication API!");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An internal server error occurred." });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
