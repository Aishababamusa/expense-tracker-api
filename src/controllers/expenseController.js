const expenseModel = require('../models/expenseModel');

const expenseController = {
  // Get all expenses (MODIFIED)
  getAllExpenses: async (req, res) => {
    try {
      const userId = req.user.id; // Get logged-in user's ID
      const expenses = await expenseModel.getAllExpenses(userId);
      
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

  // Create new expense (MODIFIED)
  createExpense: async (req, res) => {
    try {
      const userId = req.user.id; // Get logged-in user's ID
      const { type_id, amount, description, date } = req.body;

      // No need for user_id in body - we get it from the token!
      if (!type_id || !amount || !date) {
        return res.status(400).json({
          success: false,
          message: 'Please provide type_id, amount, and date'
        });
      }

      const newExpense = await expenseModel.createExpense(
        userId,  // Use logged-in user's ID
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
  },

  // Get single expense by ID (MODIFIED)
  getExpenseById: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id; // Get logged-in user's ID

      const expense = await expenseModel.getExpenseById(id, userId);

      if (!expense) {
        return res.status(404).json({
          success: false,
          message: `Expense with ID ${id} not found or you don't have access to it`
        });
      }

      res.status(200).json({
        success: true,
        data: expense
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching expense',
        error: error.message
      });
    }
  },

  // Update expense by ID (MODIFIED)
  updateExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id; // Get logged-in user's ID
      const { type_id, amount, description, date } = req.body;

      if (!type_id || !amount || !date) {
        return res.status(400).json({
          success: false,
          message: 'Please provide type_id, amount, and date'
        });
      }

      // Check if expense exists and belongs to user
      const existingExpense = await expenseModel.getExpenseById(id, userId);
      if (!existingExpense) {
        return res.status(404).json({
          success: false,
          message: `Expense with ID ${id} not found or you don't have access to it`
        });
      }

      // Update the expense
      const updatedExpense = await expenseModel.updateExpense(
        id,
        userId,
        type_id,
        amount,
        description,
        date
      );

      res.status(200).json({
        success: true,
        message: 'Expense updated successfully',
        data: updatedExpense
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating expense',
        error: error.message
      });
    }
  },

  // Delete expense by ID (MODIFIED)
  deleteExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id; // Get logged-in user's ID

      // Check if expense exists and belongs to user
      const existingExpense = await expenseModel.getExpenseById(id, userId);
      if (!existingExpense) {
        return res.status(404).json({
          success: false,
          message: `Expense with ID ${id} not found or you don't have access to it`
        });
      }

      // Delete the expense
      const deletedExpense = await expenseModel.deleteExpense(id, userId);

      res.status(200).json({
        success: true,
        message: 'Expense deleted successfully',
        data: deletedExpense
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting expense',
        error: error.message
      });
    }
  }
};

module.exports = expenseController;