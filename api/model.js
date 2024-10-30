require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const get_trade_offers_for_user = async (user_id) => {
  try {
    const res = await pool.query(
      'SELECT * FROM trade_offer_view WHERE sender_id = $1 OR receiver_id = $1;', [user_id]
    );
    return res;
  } catch (err) {
    console.error('Error executing query', err);
    throw err; 
  }
};

const get_trade_offer_patches = async (trade_id) => {
  try {
    const res = await pool.query(
      'SELECT * FROM trade_offer_patches_view WHERE trade_offer_id = $1;', [trade_id]
    );
    return res;
  } catch (err) {
    console.error('Error executing query', err);
    throw err; 
  }
};

const set_trade_offer_to_approved = async (trade_id) => {
  try {
    const res = await pool.query(
      'UPDATE trade_offer SET approved = TRUE WHERE id = $1;', [trade_id]
    );
    return res;
  } catch (err) {
    console.error('Error executing query', err);
    throw err; 
  }
};

const get_patches = async () => {
  try {
    const res = await pool.query('SELECT * FROM patch;');
    return res;  // Return the result of the query
  } catch (err) {
    console.error('Error executing query', err);
    throw err;  // Throw the error to be caught in the API handler
  }
};

const get_placement_categories = async () => {
  try {
    const res = await pool.query('SELECT * FROM placement_category;');
    return res;  // Return the result of the query
  } catch (err) {
    console.error('Error executing query', err);
    throw err;  // Throw the error to be caught in the API handler
  }
};


const get_universities = async () => {
  try {
    const res = await pool.query('SELECT DISTINCT university FROM ovve_color ORDER BY university ASC;');
    return res;  // Return the result of the query
  } catch (err) {
    console.error('Error executing query', err);
    throw err;  // Throw the error to be caught in the API handler
  }
};

const get_determinators = async (university) => {
  try {
    const res = await pool.query('SELECT determinator, id FROM ovve_color WHERE university = $1 ORDER BY determinator ASC;', [university]);
    return res;  // Return the result of the query
  } catch (err) {
    console.error('Error executing query', err);
    throw err;  // Throw the error to be caught in the API handler
  }
};

const get_ovve_types = async () => {
  try {
    const res = await pool.query('SELECT name, id FROM ovve_type ORDER BY name ASC;');
    return res;  // Return the result of the query
  } catch (err) {
    console.error('Error executing query', err);
    throw err;  // Throw the error to be caught in the API handler
  }
};

const get_users = async () => {
  try {
    const res = await pool.query('SELECT username, id FROM profile_view;');
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

const get_password_by_username = async (username) => {
  try {
    const res = await pool.query('SELECT password, id FROM profile WHERE username = $1;', [username]);
    return res.rows[0]; 
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
    patch_id, profile_id, price, obtained_date, lost_date, obtained_from, tradable
  } = userData;

  try {
    // Insert inventory into the patch_inventory table
    const res = await pool.query(
      `INSERT INTO patch_inventory (patch_id, profile_id, price, obtained_date, lost_date, obtained_from, tradable)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;`,
      [patch_id, profile_id, price, obtained_date, lost_date, obtained_from, tradable]
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

const get_not_sewn_patches_for_profile_by_date = async (user_id, date) => {
  try {
    const res = await pool.query(
      'SELECT * FROM patch_not_sewn_view WHERE profile_id = $1 AND $2 >= TST AND $2 < TET;', [user_id, date]
    );
    return res;
  } catch (err) {
    console.error('Error executing query', err);
    throw err; 
  }
};

const get_trade_patches_for_profile_by_date = async (user_id, date) => {
  try {
    const res = await pool.query(
      'SELECT * FROM trade_patch_view WHERE profile_id = $1 AND $2 >= TST AND $2 < TET;', [user_id, date]
    );
    return res;
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
};

const get_tradable_patches_for_profile = async (id) => {
  try {
    const res = await pool.query(
      'SELECT p_i.id AS patch_inventory_id, p.name AS patch_name FROM patch_inventory p_i JOIN patch p ON p.id = p_i.patch_id WHERE p_i.profile_id = $1 AND p_i.tradable = TRUE ORDER BY p.name ASC;', [id]
    );
    return res;
  } catch (err) {
    console.error('Error executing query', err);
    throw err; 
  }
};

const get_all_trade_patches = async () => {
  try {
    const res = await pool.query(
      'SELECT * FROM tradable_patches;', [id]
    );
    return res;
  } catch (err) {
    console.error('Error executing query', err);
    throw err; 
  }
};

// när man insertar en ny patch på sin profil ska:
// 1: om patchen inte finns, lägg till den i patch
// 2: lägg till patchen i användarens inventory med angett obtained_date
// samt lost_date = 9999-12-31 (+ resterande data: patch_id, profile_id, price, obtained_from)
// 3: lägg till det nya inventory-idt i patch_status (patch).
// om sewn_on = false:
// sätt TST = obtained_date och TET = 9999-12-31 och sewn_on = false. 
// om sewn_on = true, kolla om obtained_date är samma som sy-datum. 
// om obtained_date = sy-datum: lägg till patchen i patch_status med 
// TST = obtained_date och TET = 9999-12-31 och sewn_on = true.
// om obtained_date < sy-datum: lägg till två separata entries i patch_status,
// ett där TST = obtained_date och TET = sy-datum och sewn_on = false, samt
// ett där TST = sy-datum och TET = 9999-12-31 och sewn_on = true

module.exports = {
  get_trade_offers_for_user,
  get_trade_offer_patches,
  set_trade_offer_to_approved,
  get_patches,
  get_placement_categories,
  get_users,
  get_profile_by_username,
  get_universities,
  get_determinators,
  get_ovve_types,
  get_password_by_username,
  get_tradable_patches_for_profile,
  create_user,
  create_inventory,
  create_status,
  get_sewn_patches_for_profile_by_date,
  get_not_sewn_patches_for_profile_by_date,
  get_trade_patches_for_profile_by_date,
  get_all_trade_patches,
};