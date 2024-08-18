import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './ExpenseForm.css';

const ExpenseForm = ({ setExpenses }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [description, setDescription] = useState('');
    const [customCategory, setCustomCategory] = useState('');

    const categories = ['Food', 'Transport', 'Entertainment', 'Other'];

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedCategory = customCategory || category;

        axios
            .post('https://expense-tracker-app-server-c7i1.onrender.com/api/expenses', {
                amount,
                category: selectedCategory,
                date,
                description,
            })
            .then((response) => {
                setExpenses((prevExpenses) => [...prevExpenses, response.data]);
                setAmount('');
                setCategory('Food');
                setDate(new Date().toISOString().split('T')[0]);
                setDescription('');
                setCustomCategory('');
                toast.success('Expense added successfully!');
            })
            .catch((error) => {
                console.error("Error adding expense:", error);
                toast.error('Error adding expense. Please try again.');
            });
    };

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <h2>Expense Log</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                placeholder="Amount"
                className="form-input"
            />
            <div className="form-group">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Custom Category"
                    className="form-input custom-category"
                />
            </div>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (Optional)"
                className="form-input"
            />
            <button type="submit" className="submit-button">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;
