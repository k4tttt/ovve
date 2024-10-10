const express = require('express');
const app = express();
const port = 3001;

const ovve_model = require('./model');

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  console.log("detta funkar ju?");
  res.status(200).send('Hello World!');
});

app.get('/test-connection', async (req, res) => {
  try {
    const result = await ovve_model.get_patches();
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Ensure the result is returned here
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});