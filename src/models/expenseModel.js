const pool = require('../config/database');

const expenseModel = {
  // Get all expenses
  getAllExpenses: async () => {
    try {
      const query = `
        SELECT 
          expenses.id,
          expenses.amount,
          expenses.description,
          expenses.date,
          types.name AS type,
          users.name AS user_name
        FROM expenses
        JOIN types ON expenses.type_id = types.id
        JOIN users ON expenses.user_id = users.id
        ORDER BY expenses.date DESC
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Create new expense
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
  }
};

module.exports = expenseModel;