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

app.get('/get-trade-offers-for-user', async (req, res) => {
  try {
    const { user_id } = req.query;  // Extract user_id from query parameters
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const result = await ovve_model.get_trade_offers_for_user(user_id);
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

app.get('/get-trade-offer-patches', async (req, res) => {
  try {
    const { trade_id } = req.query;  // Extract user_id from query parameters
    if (!trade_id) {
      return res.status(400).json({ error: 'Trade ID is required' });
    }

    const result = await ovve_model.get_trade_offer_patches(trade_id);
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

app.get('/get-trade-offer', async (req, res) => {
  try {
    const { trade_id } = req.query; 

    if (!trade_id) {
      return res.status(400).json({ error: 'Trade ID is required' });
    }

    const result = await ovve_model.get_trade_offer(trade_id);
    res.status(200).json({
      message: "Connection successful",
      result: result,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

app.put('/set-trade-offer-to-approved', async (req, res) => {
  try {
    const { trade_id } = req.body;  // Extract user_id from query parameters
    if (!trade_id) {
      return res.status(400).json({ error: 'Trade ID is required' });
    }

    const result = await ovve_model.set_trade_offer_to_approved(trade_id);
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

app.put('/set-trade-offer-to-denied', async (req, res) => {
  try {
    const { trade_id } = req.body;  // Extract user_id from query parameters
    if (!trade_id) {
      return res.status(400).json({ error: 'Trade ID is required' });
    }

    const result = await ovve_model.set_trade_offer_to_denied(trade_id);
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

/**
 * @swagger
 * /create-trade-offer:
 *   post:
 *     summary: Create a new trade offer between profiles.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sending_profile_id:
 *                 type: integer
 *                 example: 1
 *               receiving_profile_id:
 *                 type: integer
 *                 example: 2
 *               sending_profile_patch_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [3, 5, 7]
 *               receiving_profile_patch_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [8, 10, 12]
 *     responses:
 *       200:
 *         description: Trade offer created successfully.
 *       500:
 *         description: Server error.
 */
app.post('/create-trade-offer', async (req, res) => {
  try {
    const { sending_profile_id, receiving_profile_id, sending_profile_patch_ids, receiving_profile_patch_ids } = req.body;

    const result = await ovve_model.create_trade_offer({
      sending_profile_id, receiving_profile_id, sending_profile_patch_ids, receiving_profile_patch_ids
    });
    res.status(200).json(result); // Sending success message
  } catch (err) {
    res.status(500).json({
      message: "Error creating trade offer",
      error: err.message
    });
  }
});

app.post('/edit-trade-offer', async (req, res) => {
  try {
    const { trade_offer_id, sending_profile_id, receiving_profile_id, sending_profile_patch_ids, receiving_profile_patch_ids } = req.body;

    const result = await ovve_model.edit_trade_offer({
      trade_offer_id, sending_profile_id, receiving_profile_id, sending_profile_patch_ids, receiving_profile_patch_ids
    });
    res.status(200).json(result); // Sending success message
  } catch (err) {
    res.status(500).json({
      message: "Error creating trade offer",
      error: err.message
    });
  }
});

/**
 * @swagger
 * /get-profile:
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
app.get('/get-profile', async (req, res) => {
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

/**
 * @swagger
 * /get-password:
 *   get:
 *     summary: Retrieve a password by username
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         description: The username of the profile to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Password retrieved successfully
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
 *       400:
 *         description: Bad request - Username is required
 *       500:
 *         description: Internal server error
 */
app.get('/get-password', async (req, res) => {
  try {
    const username = req.query.username;  // Extract username from query parameters
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const result = await ovve_model.get_password_by_username(username);
    res.status(200).json({
      message: "Connection successful",
      result: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

/**
 * @swagger
 * /get-universities:
 *   get:
 *     summary: Retrieve the list of all universities.
 *     description: Fetches all the universities from the ovve_color table in the database.
 *     tags: [University]
 *     responses:
 *       200:
 *         description: Successfully fetched the list of universities.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Connection successful
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       university:
 *                         type: string
 *                       id:
 *                         type: integer
 *       500:
 *         description: Connection to the database failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Connection failed
 *                 details:
 *                   type: string
 *                   example: Error message details
 */
app.get('/get-universities', async (req, res) => {
  try {
    const result = await ovve_model.get_universities();
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

/**
 * @swagger
 * /get-ovve-types:
 *   get:
 *     summary: Retrieve the list of all types of ovves.
 *     description: Fetches all the types from the ovve_type table in the database.
 *     responses:
 *       200:
 *         description: Successfully fetched the list of types.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Connection successful
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       id:
 *                         type: integer
 *       500:
 *         description: Connection to the database failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Connection failed
 *                 details:
 *                   type: string
 *                   example: Error message details
 */
app.get('/get-ovve-types', async (req, res) => {
  try {
    const result = await ovve_model.get_ovve_types();
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

/**
 * @swagger
 * /get-determinators/{university}:
 *   get:
 *     summary: Retrieve determinators for a specific university.
 *     description: Fetches all determinators for a given university from the ovve_color table in the database.
 *     tags: [University]
 *     parameters:
 *       - in: path
 *         name: university
 *         required: true
 *         description: The university for which to fetch the determinators.
 *         schema:
 *           type: string
 *           example: University of Awesome
 *     responses:
 *       200:
 *         description: Successfully fetched the determinators for the specified university.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Connection successful
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       determinator:
 *                         type: string
 *                         example: Blue and Gold
 *       500:
 *         description: Connection to the database failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Connection failed
 *                 details:
 *                   type: string
 *                   example: Error message details
 */
app.get('/get-determinators/:university', async (req, res) => {
  try {
    const { university } = req.params;
    const result = await ovve_model.get_determinators(university);
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

/**
 * @swagger
 * /get-users:
 *   get:
 *     summary: Retrieve the list of all usernames and their id:s.
 *     responses:
 *       200:
 *         description: Successfully fetched the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Connection successful
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                       id:
 *                         type: integer
 *       500:
 *         description: Connection to the database failed.
 */
app.get('/get-users', async (req, res) => {
  try {
    const result = await ovve_model.get_users();
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

/**
 * @swagger
 * /create-user:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               ovve_name:
 *                 type: string
 *               purchase_date:
 *                 type: string
 *                 format: date
 *               inauguration_date:
 *                 type: string
 *                 format: date
 *               biography:
 *                 type: string
 *               color:
 *                 type: integer
 *               type:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid email format
 *       409:
 *         description: Username already in use
 *       500:
 *         description: Server error
 */
app.post('/create-user', async (req, res) => {
  try {
    const { username, password, ovve_name, purchase_date, inauguration_date, biography, color, type, email } = req.body;

    const result = await ovve_model.create_user({
      username, password, ovve_name, purchase_date, inauguration_date, biography, color, type, email
    });

    res.status(201).json({
      message: 'User created successfully',
      user: result //return the id
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

/**
 * @swagger
 * /create-inventory:
 *   post:
 *     summary: Create a new inventory
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patch_id:
 *                 type: integer
 *               profile_id:
 *                 type: integer
 *               price:
 *                 type: integer
 *               obtained_date:
 *                 type: string
 *                 format: date
 *               lost_date:
 *                 type: string
 *                 format: date
 *               obtained_from:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inventory created successfully
 *       500:
 *         description: Server error
 */
app.post('/create-inventory', async (req, res) => {
  try {
    const { patch_id, profile_id, price, obtained_date, lost_date, obtained_from, tradable } = req.body;

    const result = await ovve_model.create_inventory({
      patch_id, profile_id, price, obtained_date, lost_date, obtained_from, tradable
    });

    res.status(201).json({
      message: 'Inventory created successfully',
      user: result //return the id
    });
  } catch (err) {
    console.error('Error creating inventory:', err);
    res.status(500).json({
      error: 'An error occurred while creating the inventory',
      details: err.message,
    });
  }
});

/**
 * @swagger
 * /create-status:
 *   post:
 *     summary: Create a new status
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TST:
 *                 type: string
 *                 format: date
 *               TET:
 *                 type: string
 *                 format: date
 *               sewn_on:
 *                 type: boolean
 *               placement:
 *                 type: integer
 *               patch:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Status created successfully
 *       500:
 *         description: Server error
 */
app.post('/create-status', async (req, res) => {
  try {
    const { TST, TET, sewn_on, placement, patch } = req.body;

    const result = await ovve_model.create_status({
      TST, TET, sewn_on, placement, patch
    });

    res.status(201).json({
      message: 'Status created successfully',
      user: result //return the id
    });
  } catch (err) {
    console.error('Error creating status:', err);
    res.status(500).json({
      error: 'An error occurred while creating the status',
      details: err.message,
    });
  }
});

app.get('/get-sewn-patches-for-profile-by-date', async (req, res) => {
  try {
    const { user_id, date } = req.query;  // Extract user_id and date from query parameters
    if (!user_id || !date) {
      return res.status(400).json({ error: 'User ID and Date are required' });
    }

    const result = await ovve_model.get_sewn_patches_for_profile_by_date(user_id, date);
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

app.get('/get-not-sewn-patches-for-profile-by-date', async (req, res) => {
  try {
    const { user_id, date } = req.query;  // Extract user_id and date from query parameters
    if (!user_id || !date) {
      return res.status(400).json({ error: 'User ID and Date are required' });
    }

    const result = await ovve_model.get_not_sewn_patches_for_profile_by_date(user_id, date);
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

app.get('/get-trade-patches-for-profile-by-date', async (req, res) => {
  try {
    const { user_id, date } = req.query;  // Extract user_id and date from query parameters
    if (!user_id || !date) {
      return res.status(400).json({ error: 'User ID and Date are required' });
    }

    const result = await ovve_model.get_trade_patches_for_profile_by_date(user_id, date);
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

/**
 * @swagger
 * /get-tradable-patches-for-profile/{id}:
 *   get:
 *     summary: Retrieve patches that are marked as tradable for a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user id for the profile which to fetch the tradable patches.
 *         schema:
 *           type: string
 *     responses:
 *       500:
 *         description: Connection to the database failed.
 *       400:
 *         description: Bad request - User ID is required
 *       200:
 *         description: Successfully fetched the tradable patches for the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Connection successful
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       patch_inventory_id:
 *                         type: integer
 *                       patch_name:
 *                         type: string
 */
app.get('/get-tradable-patches-for-profile/:id', async (req, res) => {
  try {
    const { id } = req.params;  // Extract user id from query parameters
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const result = await ovve_model.get_tradable_patches_for_profile(id);
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

app.get('/get-patches', async (req, res) => {
  try {
    const result = await ovve_model.get_patches();
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

app.get('/get-placement-categories', async (req, res) => {
  try {
    const result = await ovve_model.get_placement_categories();
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,  // Return the rows fetched by the query
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

app.get('/get-all-trade-patches', async (req, res) => {
  try {
    const result = await ovve_model.get_all_trade_patches();
    res.status(200).json({
      message: "Connection successful",
      result: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connection failed', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});