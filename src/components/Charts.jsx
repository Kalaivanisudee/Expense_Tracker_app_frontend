import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Charts = ({ expenses }) => {
    const categories = [...new Set(expenses.map((expense) => expense.category))];
    const categoryData = categories.map(
        (category) => expenses.filter((expense) => expense.category === category).reduce((acc, curr) => acc + curr.amount, 0)
    );

    const monthlyExpenses = expenses.reduce((acc, curr) => {
        const month = new Date(curr.date).getMonth();
        acc[month] = acc[month] ? acc[month] + curr.amount : curr.amount;
        return acc;
    }, new Array(12).fill(0));

    return (
        <div className="charts-container">
            <h2 className="chart-title">Charts and Visualization</h2>
            <div className="chart">
                <Pie
                    data={{
                        labels: categories,
                        datasets: [
                            {
                                data: categoryData,
                                backgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56',
                                    '#4BC0C0',
                                ],
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
            </div>
            <div className="chart">
                <Line
                    data={{
                        labels: [...Array(12).keys()].map((month) => month + 1),
                        datasets: [
                            {
                                label: 'Monthly Expenses',
                                data: monthlyExpenses,
                                borderColor: '#FF6384',
                                fill: false,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Month'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Amount'
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Charts;
