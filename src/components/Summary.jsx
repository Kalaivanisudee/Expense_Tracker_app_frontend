import React from 'react';
import './Summary.css';

const Summary = ({ expenses }) => {
    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const totalPerCategory = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    return (
        <div className="summary-container">
            <h2>Expense Summary</h2>
            <p>Total Expenses: ₹{total.toFixed(2)}</p>
            <h3>Expenses by Category:</h3>
            <ul>
                {Object.entries(totalPerCategory).map(([category, amount]) => (
                    <li key={category}>{category}: ₹{amount.toFixed(2)}</li>
                ))}
            </ul>
        </div>
    );
};

export default Summary;
