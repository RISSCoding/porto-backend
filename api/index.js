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
    const pinnedRepos = response.data.filter(repo => repo.topics.includes('pinned'));
    res.json(pinnedRepos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pinned repos' });
  }
});

module.exports = app;
