// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const cors = require('cors');

/* Middleware */
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`); 
});

// Initialize all route with a callback function
// GET route to return project data
app.get('/all', (req, res) => {
  res.send(projectData); 
});

// Post Route
app.post('/add', (req, res) => {
  projectData = {
    temperature: req.body.temperature,
    date: req.body.date,
    feel: req.body.feel,
  };
  res.send(projectData);
});
