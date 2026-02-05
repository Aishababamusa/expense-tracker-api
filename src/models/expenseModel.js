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

  // Update expense by ID for a specific user 
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

  // Delete expense by ID for a specific user 
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
  },
  // Filter expenses by date range
  getExpensesByDateRange: async (userId, startDate, endDate) => {
    try {
      const query = `
        SELECT 
          expenses.id,
          expenses.amount,
          expenses.description,
          expenses.date,
          types.name AS type,
          expenses.created_at
        FROM expenses
        JOIN types ON expenses.type_id = types.id
        WHERE expenses.user_id = $1 
          AND expenses.date >= $2 
          AND expenses.date <= $3
        ORDER BY expenses.date DESC
      `;
      const result = await pool.query(query, [userId, startDate, endDate]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Filter expenses by type/category
  getExpensesByType: async (userId, typeId) => {
    try {
      const query = `
        SELECT 
          expenses.id,
          expenses.amount,
          expenses.description,
          expenses.date,
          types.name AS type,
          expenses.created_at
        FROM expenses
        JOIN types ON expenses.type_id = types.id
        WHERE expenses.user_id = $1 AND expenses.type_id = $2
        ORDER BY expenses.date DESC
      `;
      const result = await pool.query(query, [userId, typeId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Search expenses by description
  searchExpenses: async (userId, searchTerm) => {
    try {
      const query = `
        SELECT 
          expenses.id,
          expenses.amount,
          expenses.description,
          expenses.date,
          types.name AS type,
          expenses.created_at
        FROM expenses
        JOIN types ON expenses.type_id = types.id
        WHERE expenses.user_id = $1 
          AND expenses.description ILIKE $2
        ORDER BY expenses.date DESC
      `;
      const result = await pool.query(query, [userId, `%${searchTerm}%`]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Get total spending for a user
  getTotalSpending: async (userId, startDate = null, endDate = null) => {
    try {
      let query = `
        SELECT COALESCE(SUM(amount), 0) as total
        FROM expenses
        WHERE user_id = $1
      `;
      const values = [userId];

      // Add date filters if provided
      if (startDate && endDate) {
        query += ` AND date >= $2 AND date <= $3`;
        values.push(startDate, endDate);
      }

      const result = await pool.query(query, values);
      return parseFloat(result.rows[0].total);
    } catch (error) {
      throw error;
    }
  },

  // Get spending by category
  getSpendingByCategory: async (userId, startDate = null, endDate = null) => {
    try {
      let query = `
        SELECT 
          types.name AS category,
          COALESCE(SUM(expenses.amount), 0) AS total,
          COUNT(expenses.id) AS count
        FROM expenses
        JOIN types ON expenses.type_id = types.id
        WHERE expenses.user_id = $1
      `;
      const values = [userId];

      // Add date filters if provided
      if (startDate && endDate) {
        query += ` AND expenses.date >= $2 AND expenses.date <= $3`;
        values.push(startDate, endDate);
      }

      query += ` GROUP BY types.name ORDER BY total DESC`;

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

};

module.exports = expenseModel;