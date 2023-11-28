import React, { useEffect, useRef } from 'react';
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';

Chart.register(
  BarController,
  CategoryScale,
  LinearScale,
  BarElement
);

const RoundedBarChart = ({ dataset1, label1 }: any) => {
  const chartRef = useRef<any>(null);
  const chartInstanceRef = useRef<any>(null);

  const labels = ['Cuadrant 1', 'Cuadrant 2', 'Cuadrant 3', 'Cuadrant 4']; // Customize your labels

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy the old chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Create a new chart instance and store it in the ref
        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: label1,
                data: dataset1,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 2,
                borderRadius: 25,
              },
            ],
          },
          options: {
            // Add any specific options you need here
          }
        });
      }
    }
  }, [dataset1]); // Re-run the effect when dataset1 or dataset2 changes

  return <canvas ref={chartRef} />;
};

export default RoundedBarChart;
