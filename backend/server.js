require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*", // Change this to your frontend URL in production
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// MongoDB Connection Function
function connection(DB_URL, DB_NAME = "Database", maxPoolSize = 10) {
  try {
    const dbConfig = { readPreference: "secondaryPreferred", maxPoolSize };

    const conn = mongoose.createConnection(DB_URL, dbConfig);
    conn.on("connected", () => console.log(`✅ Connected to ${DB_NAME} database.`));
    conn.on("error", (err) => console.error(`❌ MongoDB Error (${DB_NAME}):`, err));

    return conn;
  } catch (error) {
    console.error(`❌ Failed to connect to ${DB_NAME}:`, error);
  }
}

// Initialize Database Connection
const TodoDBConnect = connection(process.env.MONGO_URI, "TodoDB");

// Define Schema and Model using the `TodoDBConnect` instance
const TodoSchema = new mongoose.Schema({ text: String });
const Todo = TodoDBConnect.model("Todo", TodoSchema);

// API Routes
app.get("/items", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("❌ Error fetching items:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

app.post("/items", async (req, res) => {
  try {
    const newTodo = new Todo({ text: req.body.text });
    await newTodo.save();
    console.log("📌 New item added:", req.body.text);
    res.json(newTodo);
  } catch (error) {
    console.error("❌ Error adding item:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
