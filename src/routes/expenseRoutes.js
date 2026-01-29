const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// GET all expenses
router.get('/', expenseController.getAllExpenses);

// POST create new expense (ADD THIS)
router.post('/', expenseController.createExpense);

module.exports = router;