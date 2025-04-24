import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

interface MiniChartProps {
  data: number[];
  priceChange7d: number;
}

const MiniChart: React.FC<MiniChartProps> = ({ data, priceChange7d }) => {
  const isPositive = priceChange7d >= 0;
  const lineColor = isPositive ? '#00c36e' : '#de2121';
  const gradientTopColor = isPositive ? 'rgba(0, 195, 110, 0.1)' : 'rgba(222, 33, 33, 0.1)';
  
  const chartData = {
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        data,
        fill: true,
        borderColor: lineColor,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 50);
          gradient.addColorStop(0, gradientTopColor);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      line: { tension: 0.4 },
    },
  };

  return (
    <div className="h-12 w-32">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MiniChart;