import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import Charts from './components/Charts';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('https://expense-tracker-app-server-c7i1.onrender.com/api/expenses').then((response) => {
      setExpenses(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Expense Tracker App</h1>
      <section>
        <ExpenseForm setExpenses={setExpenses} />
      </section>
      <section>
        <Summary expenses={expenses} />
      </section>
      <section>
        <Charts expenses={expenses} />
      </section>
      <section>
        <ExpenseList expenses={expenses} setExpenses={setExpenses} />
      </section>
      <ToastContainer />
    </div>
  );
}

export default App;
