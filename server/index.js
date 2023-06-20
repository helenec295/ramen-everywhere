require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const apiKey = process.env.YELP_API_KEY;

app.get('/api/ramen', async (req, res) => {
  try {
    const { location } = req.query;
    const yelpAPIUrl = 'https://api.yelp.com/v3/businesses/search';
    const response = await axios.get(yelpAPIUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: {
        term: 'ramen',
        location,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from Yelp API', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

