const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3001;

const ovve_model = require('./model');

app.use(express.json())

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ovve API',
      version: '1.0.0',
      description: 'API documentation for the Ovve project',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Server URL
      },
    ],
  },
  apis: ['./index.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// CORS setup
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

/**
 * @swagger
 * /get_profile:
 *   get:
 *     summary: Retrieve a user profile by username
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         description: The username of the profile to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 *                       biography:
 *                         type: string
 *                       color:
 *                         type: integer
 *                       type:
 *                         type: integer
 *       400:
 *         description: Bad request - Username is required
 *       500:
 *         description: Internal server error
 */
app.get('/get_profile', async (req, res) => {
  try {
    const username = req.query.username;  // Extract username from query parameters
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const result = await ovve_model.get_profile_by_username(username);
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

app.post('/create-user', async (req, res) => {
  try {
    const { username, password, ovve_name, purchase_date, inauguration_date, biography, color, type, email } = req.body;

    // Call the model to insert the new user
    const result = await ovve_model.create_user({
      username, password, ovve_name, purchase_date, inauguration_date, biography, color, type, email
    });

    res.status(201).json({
      message: 'User created successfully',
      user: result.rows[0] // Return the inserted user
    });
  } catch (err) {
    // Handle known "Invalid email format" error
    if (err.message === 'Invalid email format') {
      return res.status(400).json({
        error: 'Invalid email format. Please provide a valid email address.'
      });
    }

    // Handle known "Username already exists" error
    if (err.message === 'Username already exists') {
      return res.status(409).json({
        error: 'Username already in use. Please choose a different username.'
      });
    }

    // Handle other errors
    console.error('Error creating profile:', err);
    res.status(500).json({
      error: 'An error occurred while creating the profile',
      details: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});