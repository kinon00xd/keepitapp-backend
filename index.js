const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000; // ✅ Important for Render

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
