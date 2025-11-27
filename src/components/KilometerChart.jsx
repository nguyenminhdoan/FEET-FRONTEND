import React, { useRef } from 'react';
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

const KilometerChart = ({ data }) => {
  const chartRef = useRef(null);

  if (!data || !data.predictions) return null;

  const labels = data.predictions.map((p) => p.date);
  const kilometers = data.predictions.map((p) => p.mileage_km);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${data.subsystem.replace('_', ' ')} - Predicted Mileage`,
        data: kilometers,
        borderColor: 'rgb(108, 109, 112)',
        backgroundColor: 'rgba(108, 109, 112, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgb(108, 109, 112)',
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
            return 'Mileage: ' + context.parsed.y.toLocaleString() + ' km';
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return value.toLocaleString() + ' km';
          },
        },
        title: {
          display: true,
          text: 'Mileage (km)',
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

export default KilometerChart;
