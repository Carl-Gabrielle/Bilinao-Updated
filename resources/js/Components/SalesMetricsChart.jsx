import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesMetricsChart = ({ data }) => {
    if (!data || !data.labels?.length) {
        return <p className="text-center text-gray-500">No data available</p>;
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Sales Metrics",
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default SalesMetricsChart;
