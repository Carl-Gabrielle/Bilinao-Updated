// SalesMetricsChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const SalesMetricsChart = ({ salesData }) => {
    const data = {
        labels: salesData.map(data => data.date), // Dates for the x-axis
        datasets: [
            {
                label: 'Sales Revenue',
                data: salesData.map(data => data.revenue), // Sales revenue for the y-axis
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Metrics',
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default SalesMetricsChart;
