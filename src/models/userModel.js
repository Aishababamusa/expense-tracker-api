const pool = require('../config/database');

const userModel = {
  // Create new user
  createUser: async (name, email, hashedPassword) => {
    try {
      const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at
      `;
      const values = [name, email, hashedPassword];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Find user by email
  findUserByEmail: async (email) => {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Find user by ID
  findUserById: async (id) => {
    try {
      const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = userModel;