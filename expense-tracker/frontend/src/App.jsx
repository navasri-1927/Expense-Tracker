import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/api/expenses";

  // Fetch Expenses
  const fetchExpenses = async () => {
    try {
      const res = await axios.get(API);
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Add or Update Expense
  const addExpense = async () => {
    if (!title || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, {
          title,
          amount,
          category,
        });

        setEditId(null);
      } else {
        await axios.post(API, {
          title,
          amount,
          category,
        });
      }

      setTitle("");
      setAmount("");
      setCategory("");

      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate Total
  const totalExpense = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  return (
    <div className="container">
      <h1>💰 Expense Tracker</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <button onClick={addExpense}>
          {editId ? "Update Expense" : "Add Expense"}
        </button>
      </div>

      <div className="total-card">
        <h2>Total Expense</h2>
        <h1>₹ {totalExpense}</h1>
      </div>

      <div className="expense-list">
        {expenses.map((expense) => (
          <div className="card" key={expense._id}>
            <h3>{expense.title}</h3>

            <p>
              <strong>Amount:</strong> ₹ {expense.amount}
            </p>

            <p>
              <strong>Category:</strong> {expense.category}
            </p>

            <div className="btn-group">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditId(expense._id);
                  setTitle(expense.title);
                  setAmount(expense.amount);
                  setCategory(expense.category);
                }}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteExpense(expense._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;