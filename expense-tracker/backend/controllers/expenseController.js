const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
};

exports.addExpense = async (req, res) => {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
};

exports.deleteExpense = async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
};