import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

type BarGraphProps = {
    data: number[];
    labels: string[];
};

const BarGraph: React.FC<BarGraphProps> = ({ data, labels }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Data',
                                data: data,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        }
    }, [data, labels]);

    return <canvas ref={chartRef} />;
};

export default BarGraph;
