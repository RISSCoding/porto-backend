const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

// Replace with your GitHub Personal Access Token
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; 

app.get('/api/pinned-repos', async (req, res) => {
  try {
    // GitHub GraphQL API endpoint
    const graphqlEndpoint = 'https://api.github.com/graphql';

    // GraphQL query to fetch pinned repositories
    const query = `
      query {
        user(login: "RISSCoding") {
          pinnedItems(first: 6) {
            edges {
              node {
                ... on Repository {
                  name
                  description
                  stargazerCount
                  url
                }
              }
            }
          }
        }
      }
    `;

    // Request headers
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    };

    // Make the request to GitHub's GraphQL API
    const response = await axios.post(
      graphqlEndpoint,
      { query },
      { headers }
    );

    // Extract pinned repositories data
    const pinnedRepos = response.data.data.user.pinnedItems.edges.map(item => ({
      name: item.node.name,
      description: item.node.description,
      stars: item.node.stargazerCount,
      link: item.node.url,
    }));

    // Return the pinned repositories data
    res.json(pinnedRepos);
  } catch (error) {
    console.error('Error fetching pinned repos:', error.message);
    res.status(500).json({ error: 'Failed to fetch pinned repos' });
  }
});

module.exports = app;
