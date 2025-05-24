// backend/server.js

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend access
app.use(helmet()); // Secure headers
app.use(express.json()); // Parse JSON

// Base route
app.get("/", (req, res) => {
  res.send("GitHub Finder Backend is running");
});

// Proxy GitHub profile + repos
app.get("/api/github/:username", async (req, res) => {
  const username = req.params.username;
  const page = req.query.page || 1;

  try {
    // Fetch GitHub user profile
    const profileRes = await fetch(`https://api.github.com/users/${username}`);
    if (!profileRes.ok)
      return res.status(profileRes.status).json({ error: "User not found" });
    const profile = await profileRes.json();

    // Fetch GitHub user repos (paginated)
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=5&page=${page}`
    );

    const repos = await reposRes.json();

    // Send both as response
    res.json({ profile, repos });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
