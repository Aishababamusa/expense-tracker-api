const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all routes with authentication middleware
router.use(authMiddleware); 

// GET all expenses
router.get('/', expenseController.getAllExpenses);

// POST create new expense
router.post('/', expenseController.createExpense);

// GET single expense by ID 
router.get('/:id', expenseController.getExpenseById);

// PUT update expense by ID
router.put('/:id', expenseController.updateExpense);

// DELETE expense by ID
router.delete('/:id', expenseController.deleteExpense);
module.exports = router;