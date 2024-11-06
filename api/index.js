const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/api/pinned-repos', async (req, res) => {
    try {
      const response = await axios.get('https://api.github.com/users/RISSCoding/repos');
  
      // Log the full response to check all the available repositories
      console.log(response.data);
  
      // If no pinned topic, just return all repos without filtering
      const repos = response.data.map(repo => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        link: repo.html_url,
      }));
  
      res.json(repos);  // Return all repos
    } catch (error) {
      console.error('Error fetching repos:', error.message);
      res.status(500).json({ error: 'Failed to fetch repos' });
    }
  });
  

module.exports = app;
