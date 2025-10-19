import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
let db;
const initDB = async () => {
  db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      link TEXT
    )
  `);

  console.log("✅ Database initialized");
};

// Root route
app.get("/", (req, res) => {
  res.send("✅ KeepItApp Backend is running!");
});

// Example test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is connected successfully!" });
});


// 🚀 Real routes
// 1️⃣ Get all items
app.get("/api/items", async (req, res) => {
  const items = await db.all("SELECT * FROM items ORDER BY id DESC");
  res.json(items);
});

// 2️⃣ Add new item
app.post("/api/submit", async (req, res) => {
  const { title, description, link } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  await db.run(
    "INSERT INTO items (title, description, link) VALUES (?, ?, ?)",
    [title, description, link]
  );

  res.json({ message: "Item added successfully" });
});

// Start the server
app.listen(PORT, async () => {
  await initDB();
  console.log(`🚀 Server is running on port ${PORT}`);
});
