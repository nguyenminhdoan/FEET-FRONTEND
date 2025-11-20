import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CostChart = ({ data }) => {
  const chartRef = useRef(null);

  if (!data || !data.predictions) return null;

  const labels = data.predictions.map((p) => p.date);
  const costs = data.predictions.map((p) => p.cost);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${data.subsystem.replace('_', ' ')} - Predicted Maintenance Cost`,
        data: costs,
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgb(37, 99, 235)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return 'Cost: $' + context.parsed.y.toFixed(2);
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return '$' + value.toFixed(0);
          },
        },
        title: {
          display: true,
          text: 'Maintenance Cost ($)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default CostChart;
