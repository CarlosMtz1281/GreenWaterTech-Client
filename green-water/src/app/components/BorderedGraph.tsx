import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const RoundedBarChart = ({ data }: any) => {
  const chartRef = useRef<any>(null); // Reference to store the chart instance
  const canvasRef = useRef<any>(null); // Reference to the canvas DOM element

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy the existing chart
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Bar Chart' }
        },
      },
    });

    return () => {
      chartRef.current.destroy(); // Clean up the chart instance on component unmount
    };
  }, [data]); // Re-run effect when 'data' changes

  return <canvas ref={canvasRef} width="400" height="400"></canvas>;
};

export default RoundedBarChart;
