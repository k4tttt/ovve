const express = require('express');
const app = express();
const port = 3001;

const ovve_model = require('./model');

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  console.log("detta funkar ju?");
  res.status(200).send('Hello World!');
});

app.get('/test-connection', async (req, res) => {
  console.log("hej hallå");
  try {
    const result = await ovve_model.testConnection(); // Use the testConnection function
    res.status(200).json({
      message: "Connection successful",
      result: result.rows, // Assuming testConnection returns rows from a query
    });
  } catch (err) {
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});