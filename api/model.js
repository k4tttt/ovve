require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const patchname = "Yoshi";
const patchcreator = "Märkbar";

const get_patches = async () => {
  try {
    const res = await pool.query('SELECT * FROM patch');
    return res;  // Return the result of the query
  } catch (err) {
    console.error('Error executing query', err);
    throw err;  // Throw the error to be caught in the API handler
  }
};

module.exports = {
  get_patches,
};