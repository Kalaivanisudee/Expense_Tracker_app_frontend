import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { convertToCSV } from '../utils/csvUtils';
import { downloadCSV } from '../utils/fileUtils';
import './ExpenseList.css';

const ExpenseList = ({ expenses, setExpenses }) => {
    const [editingExpense, setEditingExpense] = useState(null);
    const [editAmount, setEditAmount] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const [sortBy, setSortBy] = useState('date');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterAmount, setFilterAmount] = useState('');

    const handleDelete = (id) => {
        axios
            .delete(`https://expense-tracker-app-server-c7i1.onrender.com/api/expenses/${id}`)
            .then(() => {
                setExpenses(expenses.filter((expense) => expense._id !== id));
                toast.success('Expense deleted successfully!');
            })
            .catch((error) => {
                console.error("Error deleting expense:", error);
                toast.error('Error deleting expense. Please try again.');
            });
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense._id);
        setEditAmount(expense.amount);
        setEditCategory(expense.category);
        setEditDate(new Date(expense.date).toISOString().split('T')[0]);
        setEditDescription(expense.description);
    };

    const handleUpdate = () => {
        axios
            .put(`https://expense-tracker-app-server-c7i1.onrender.com/api/expenses/${editingExpense}`, {
                amount: editAmount,
                category: editCategory,
                date: editDate,
                description: editDescription,
            })
            .then((response) => {
                setExpenses(
                    expenses.map((expense) =>
                        expense._id === editingExpense ? response.data : expense
                    )
                );
                setEditingExpense(null);
                toast.success('Expense updated successfully!');
            })
            .catch((error) => {
                console.error("Error updating expense:", error);
                toast.error('Error updating expense. Please try again.');
            });
    };

    const handleExport = () => {
        const csvContent = convertToCSV(expenses);
        downloadCSV(csvContent, 'expenses.csv');
        toast.success('Expenses exported successfully!');
    };

    const handleSort = (criteria) => {
        setSortBy(criteria);
    };

    const handleFilter = (e) => {
        const { name, value } = e.target;
        if (name === 'category') setFilterCategory(value);
        if (name === 'amount') setFilterAmount(value);
    };

    const filteredExpenses = expenses
        .filter((expense) => {
            return (
                (filterCategory ? expense.category.includes(filterCategory) : true) &&
                (filterAmount ? expense.amount.toString().includes(filterAmount) : true)
            );
        })
        .sort((a, b) => {
            if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
            if (sortBy === 'amount') return a.amount - b.amount;
            if (sortBy === 'category') return a.category.localeCompare(b.category);
            return 0;
        });

    return (
        <div className="expense-list-container">
            <h2>Expense List</h2>
            <button className="export-btn" onClick={handleExport}>Export to CSV</button>

            <div className="filter-controls">
                <input
                    type="text"
                    name="category"
                    placeholder="Filter by Category"
                    value={filterCategory}
                    onChange={handleFilter}
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Filter by Amount"
                    value={filterAmount}
                    onChange={handleFilter}
                />
            </div>

            <div className="sort-controls">
                <button onClick={() => handleSort('date')}>Sort by Date</button>
                <button onClick={() => handleSort('amount')}>Sort by Amount</button>
                <button onClick={() => handleSort('category')}>Sort by Category</button>
            </div>

            <table className="expense-list-table">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredExpenses.map((expense) =>
                        editingExpense === expense._id ? (
                            <tr key={expense._id}>
                                <td>
                                    <input
                                        type="number"
                                        value={editAmount}
                                        onChange={(e) => setEditAmount(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editCategory}
                                        onChange={(e) => setEditCategory(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={editDate}
                                        onChange={(e) => setEditDate(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button className="save-btn" onClick={handleUpdate}>Save</button>
                                    <button className="cancel-btn" onClick={() => setEditingExpense(null)}>Cancel</button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={expense._id}>
                                <td>{expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>{new Date(expense.date).toLocaleDateString()}</td>
                                <td>{expense.description}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(expense)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(expense._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;
