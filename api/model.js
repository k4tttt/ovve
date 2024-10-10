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

const testConnection = async () => {
  try {
    const res = await pool.query('SELECT * FROM patch');
    console.log('Connected to the database:');
    console.log(res.rows);
  } catch (err) {
    console.error('Error executing query', err);
  }
};
module.exports = {
  testConnection,
};