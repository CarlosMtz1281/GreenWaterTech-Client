import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

interface LineGraphProps {
  dataset1: number[];
  dataset2: number[];
}

const LineGraph: React.FC<LineGraphProps> = ({ dataset1, dataset2 }) => {

  const chartRef = useRef<HTMLCanvasElement>(null);

  function getNextFiveDays() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const nextFiveDays = [];

    for (let i = 0; i < 5; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      nextFiveDays.push(days[nextDay.getDay()]);
    }

    return nextFiveDays;
  }

  const chartInstanceRef = useRef<Chart | null>(null);


  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Destroy the old chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Create a new chart instance and store it in the ref
        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: getNextFiveDays(),
            datasets: [
              {
                label: "Dataset 1",
                data: dataset1,
                borderColor: "red",
                fill: false,
              },
              {
                label: "Dataset 2",
                data: dataset2,
                borderColor: "blue",
                fill: false,
              },
            ],
          },
        });
      }
    }
  }, [dataset1, dataset2]); // Re-run the effect when dataset1 or dataset2 changes

  return <canvas ref={chartRef} />;
};

export default LineGraph;
