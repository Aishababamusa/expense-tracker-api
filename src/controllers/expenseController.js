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
      const { user_id, type_id, amount, description, date } = req.body;

      if (!user_id || !type_id || !amount || !date) {
        return res.status(400).json({
          success: false,
          message: 'Please provide user_id, type_id, amount, and date'
        });
      }

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
  },

  // Get single expense by ID
  getExpenseById: async (req, res) => {
    try {
      const { id } = req.params;

      const expense = await expenseModel.getExpenseById(id);

      if (!expense) {
        return res.status(404).json({
          success: false,
          message: `Expense with ID ${id} not found`
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

  // Update expense by ID
  updateExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const { type_id, amount, description, date } = req.body;

      if (!type_id || !amount || !date) {
        return res.status(400).json({
          success: false,
          message: 'Please provide type_id, amount, and date'
        });
      }

      const existingExpense = await expenseModel.getExpenseById(id);
      if (!existingExpense) {
        return res.status(404).json({
          success: false,
          message: `Expense with ID ${id} not found`
        });
      }

      const updatedExpense = await expenseModel.updateExpense(
        id,
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

  // Delete expense by ID (ADD THIS)
  deleteExpense: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if expense exists first
      const existingExpense = await expenseModel.getExpenseById(id);
      if (!existingExpense) {
        return res.status(404).json({
          success: false,
          message: `Expense with ID ${id} not found`
        });
      }

      // Delete the expense
      const deletedExpense = await expenseModel.deleteExpense(id);

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