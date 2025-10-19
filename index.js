import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
app.use(cors());
app.use(express.json());

let db;

(async () => {
  // ✅ Open the database (creates file if missing)
  db = await open({
    filename: "data.db",
    driver: sqlite3.Database,
  });

  // ✅ Create table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      link TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ✅ Get all items
  app.get("/api/items", async (req, res) => {
    const items = await db.all("SELECT * FROM items ORDER BY created_at DESC");
    res.json(items);
  });

  // ✅ Submit a new item
  app.post("/api/submit", async (req, res) => {
    const { title, description, link } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    await db.run(
      "INSERT INTO items (title, description, link) VALUES (?, ?, ?)",
      [title, description || "", link || ""]
    );

    res.json({ success: true, message: "Item added successfully!" });
  });

  // ✅ Start server
  app.listen(4000, () => {
    console.log("🚀 Public KeepItApp backend running on http://localhost:4000");
  });
})();
