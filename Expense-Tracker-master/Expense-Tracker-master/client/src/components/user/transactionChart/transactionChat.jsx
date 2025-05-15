/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler, // Import the Filler plugin
} from "chart.js";

// Import the date adapter
import "chartjs-adapter-date-fns"; // This line imports the date adapter

// Register the necessary components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler // Register the Filler plugin here
);

const TransactionChart = ({ income, expense }) => {
  const incomeData = income.map((entry) => ({
    x: entry.date, // Ensure your date format is compatible with Chart.js
    y: entry.amount,
  }));

  const expenseData = expense.map((entry) => ({
    x: entry.date, // Ensure your date format is compatible with Chart.js
    y: entry.amount,
  }));

  const data = {
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Expense",
        data: expenseData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time", // Set x-axis to time scale
        time: {
          unit: "day", // Adjust the unit as needed
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TransactionChart;