const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS

app.get('/api/:category', async (req, res) => {
  const { category } = req.params;
  const { page = 1 } = req.query; // Get the page number from query params, default to 1
  console.log(`Fetching category: ${category}, page: ${page}`); // Logging

  try {
    // REST API call to Star Wars API with pagination
    const response = await axios.get(`https://swapi.dev/api/${category}/?page=${page}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  console.log(`Fetching details for category: ${category}, id: ${id}`); // Logging

  try {
    // REST API call to fetch details for a specific item
    const response = await axios.get(`https://swapi.dev/api/${category}/${id}/`);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).send('Not Found');
    } else {
      res.status(500).send(error.message);
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
