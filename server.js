import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route (for Render health check)
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Example API route for testing
app.get("/api/test", (req, res) => {
  res.json({ message: "API is connected successfully!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
