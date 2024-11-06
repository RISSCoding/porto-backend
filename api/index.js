const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/api/pinned-repos', async (req, res) => {
  try {
    // Fetch all repositories for the user without using the Authorization header
    const response = await axios.get('https://api.github.com/users/RISSCoding/repos');
    
    // Assuming the "pinned" repos are those with the 'pinned' topic
    const pinnedRepos = response.data.filter(repo => repo.topics && repo.topics.includes('pinned')).map(repo => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      link: repo.html_url,
    }));

    res.json(pinnedRepos);
  } catch (error) {
    console.error('Error fetching pinned repos:', error.message);
    res.status(500).json({ error: 'Failed to fetch pinned repos' });
  }
});

module.exports = app;
