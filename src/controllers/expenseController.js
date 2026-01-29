const expenseModel = require('../models/expenseModel');

const expenseController = {
  // Get all expenses
  getAllExpenses: async (req, res) => {
    try {
      const expenses = await expenseModel.getAllExpenses();
      res.status(200).json({
        success: true,
        count: expenses.length,
        data: expenses
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching expenses',
        error: error.message
      });
    }
  },

  // Create new expense
  createExpense: async (req, res) => {
    try {
      // Get data from request body
      const { user_id, type_id, amount, description, date } = req.body;

      // Validate required fields
      if (!user_id || !type_id || !amount || !date) {
        return res.status(400).json({
          success: false,
          message: 'Please provide user_id, type_id, amount, and date'
        });
      }

      // Create the expense
      const newExpense = await expenseModel.createExpense(
        user_id, 
        type_id, 
        amount, 
        description, 
        date
      );

      res.status(201).json({
        success: true,
        message: 'Expense created successfully',
        data: newExpense
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating expense',
        error: error.message
      });
    }
  }
};

module.exports = expenseController;