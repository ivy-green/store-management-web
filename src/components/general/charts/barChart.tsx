'use client'

import Chart, { ChartDataset, ChartTypeRegistry } from "chart.js";
import { Chart as ChartC } from 'chart.js/auto';
import { ReactNode, useEffect, useRef } from "react";

interface Props {
    chartType: keyof ChartTypeRegistry;
    yLabels: string[];
    title?: string;
    filters?: ReactNode;
    datasets: ChartDataset<keyof ChartTypeRegistry, (number)[]>[]
}

const CustomBarChart = ({ yLabels, title, filters, datasets, chartType }: Props) => {
    // helper function to format chart data since you do this twice
    const formatData = (): Chart.ChartData => ({
        labels: yLabels,
        datasets: datasets
    });

    // use a ref to store the chart instance since it it mutable
    const chartRef = useRef<ChartC | null>(null);

    // callback creates the chart on the canvas element
    const canvasCallback = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        if (!chartRef.current) {
            if (ctx) {
                chartRef.current = new ChartC(ctx, {
                    type: chartType,
                    data: formatData(),
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: title
                            },
                        },
                        responsive: true,
                        interaction: {
                            intersect: false,
                        },
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true
                            }
                        }
                    },
                });
            }
        }
    };

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.data = formatData();
            chartRef.current.update();
        }
    }, [datasets]);

    return (
        <div className={`self-center w-full h-full`}>
            <div className="overflow-hidden h-full">
                {filters}
                <canvas ref={canvasCallback}></canvas>
            </div>
        </div>
    );
};

export default CustomBarChart