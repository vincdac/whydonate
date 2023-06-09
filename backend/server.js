const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.get('/api/search', authenticateToken, (req, res) => {
  const title = req.query.title;

  // Use the title parameter to query the TV Maze API
  axios.get(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(title)}`)
    .then(response => {
      const shows = response.data.map(item => item.show);
      res.json(shows);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Authentication middleware to check the JWT token
function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // You can add more validation or user data retrieval logic here

    next();
  });
}

// Add your other routes and middleware here

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
