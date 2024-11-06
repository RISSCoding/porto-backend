const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/api/pinned-repos', async (req, res) => {
    try {
      const response = await axios.get('https://api.github.com/users/your_username/repos', {
        headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
      });
      console.log("GitHub API Response:", response.data); // Log the response for debugging
      // Further processing...
    } catch (error) {
      console.error("Error fetching repos:", error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to fetch pinned repos' });
    }
  });

module.exports = app;
