require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const get_patches = async () => {
  try {
    const res = await pool.query('SELECT * FROM patch');
    return res;  // Return the result of the query
  } catch (err) {
    console.error('Error executing query', err);
    throw err;  // Throw the error to be caught in the API handler
  }
};

const get_university = async () => {
  try {
    const res = await pool.query('SELECT DISTINCT university FROM ovve_color ORDER BY university ASC;');
    return res;  // Return the result of the query
  } catch (err) {
    console.error('Error executing query', err);
    throw err;  // Throw the error to be caught in the API handler
  }
};

const get_determinator = async (university) => {
  try {
    const res = await pool.query('SELECT DISTINCT determinator FROM ovve_color WHERE university = $1 ORDER BY determinator ASC;', [university]);
    return res;  // Return the result of the query
  } catch (err) {
    console.error('Error executing query', err);
    throw err;  // Throw the error to be caught in the API handler
  }
};

const get_profile_by_username = async (username) => {
  try {
    const res = await pool.query('SELECT * FROM profile_view WHERE username = $1;', [username]);
    return res;
  } catch (err) {
    console.error('Error executing query', err);
    throw err; 
  }
};

const create_user = async (userData) => {
  const {
    username, password, ovve_name, purchase_date, inauguration_date, biography, color, type, email
  } = userData;

  try {
    // Insert user into the profile table
    const res = await pool.query(
      `INSERT INTO profile (username, password, ovve_name, purchase_date, inauguration_date, biography, color, type, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id;`,
      [username, password, ovve_name, purchase_date, inauguration_date, biography, color, type, email]
    );

    return res.rows[0]; 
  } catch (err) {
    console.error('Error inserting profile:', err);

    // Error due to email format constraint
    if (err.message.includes('email_format_check')) {
      throw new Error('Invalid email format'); 
    }

    // Error due to username uniqueness trigger
    if (err.message.includes('Username')) {
      throw new Error('Username already exists');
    }

    // Re-throw for all other errors
    throw err;
  }
};

const create_inventory = async (userData) => {
  const {
    patch_id, profile_id, price, obtained_date, lost_date, obtained_from
  } = userData;

  try {
    // Insert inventory into the patch_inventory table
    const res = await pool.query(
      `INSERT INTO patch_inventory (patch_id, profile_id, price, obtained_date, lost_date, obtained_from)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;`,
      [patch_id, profile_id, price, obtained_date, lost_date, obtained_from]
    );

    return res.rows[0]; 
  } catch (err) {
    console.error('Error inserting inventory:', err);

    throw err;
  }
};

const create_status = async (userData) => {
  const {
    TST, TET, sewn_on, placement, patch
  } = userData;

  try {
    // Insert status into the patch_status table
    const res = await pool.query(
      `INSERT INTO patch_status (TST, TET, sewn_on, placement, patch)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;`,
      [TST, TET, sewn_on, placement, patch]
    );

    return res.rows[0]; 
  } catch (err) {
    console.error('Error inserting status:', err);

    throw err;
  }
};

const get_sewn_patches_for_profile_by_date = async (user_id, date) => {
  try {
    const res = await pool.query(
      'SELECT * FROM patch_sewn_view WHERE profile_id = $1 AND $2 >= TST AND $2 < TET;', [user_id, date]
    );
    return res;
  } catch (err) {
    console.error('Error executing query', err);
    throw err; 
  }
};

module.exports = {
  get_patches,
  get_profile_by_username,
  get_university,
  get_determinator,
  create_user,
  create_inventory,
  create_status,
  get_sewn_patches_for_profile_by_date,
};