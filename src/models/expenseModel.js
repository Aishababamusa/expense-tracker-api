const pool = require('../config/database');

const expenseModel = {
  // Get all expenses for a specific user (MODIFIED)
  getAllExpenses: async (userId) => {
    try {
      const query = `
        SELECT 
          expenses.id,
          expenses.amount,
          expenses.description,
          expenses.date,
          types.name AS type,
          users.name AS user_name,
          expenses.created_at
        FROM expenses
        JOIN types ON expenses.type_id = types.id
        JOIN users ON expenses.user_id = users.id
        WHERE expenses.user_id = $1
        ORDER BY expenses.date DESC
      `;
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Create new expense (keep as is)
  createExpense: async (user_id, type_id, amount, description, date) => {
    try {
      const query = `
        INSERT INTO expenses (user_id, type_id, amount, description, date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const values = [user_id, type_id, amount, description, date];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Get single expense by ID for a specific user (MODIFIED)
  getExpenseById: async (id, userId) => {
    try {
      const query = `
        SELECT 
          expenses.id,
          expenses.amount,
          expenses.description,
          expenses.date,
          types.name AS type,
          users.name AS user_name,
          expenses.created_at
        FROM expenses
        JOIN types ON expenses.type_id = types.id
        JOIN users ON expenses.user_id = users.id
        WHERE expenses.id = $1 AND expenses.user_id = $2
      `;
      const result = await pool.query(query, [id, userId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Update expense by ID for a specific user (MODIFIED)
  updateExpense: async (id, userId, type_id, amount, description, date) => {
    try {
      const query = `
        UPDATE expenses
        SET type_id = $1, amount = $2, description = $3, date = $4
        WHERE id = $5 AND user_id = $6
        RETURNING *
      `;
      const values = [type_id, amount, description, date, id, userId];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Delete expense by ID for a specific user (MODIFIED)
  deleteExpense: async (id, userId) => {
    try {
      const query = `
        DELETE FROM expenses
        WHERE id = $1 AND user_id = $2
        RETURNING *
      `;
      const result = await pool.query(query, [id, userId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = expenseModel;