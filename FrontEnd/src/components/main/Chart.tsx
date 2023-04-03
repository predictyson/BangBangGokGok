import React, { useEffect, useRef } from "react";
import { Chart, ChartType } from "chart.js/auto";
interface IBarData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}
interface Props {
  data: IBarData;
}

const BarChart: React.FC<Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let chartInstance: Chart | undefined;
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        chartInstance = Chart.getChart(ctx);

        if (chartInstance) {
          chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
          type: "bar" as ChartType,
          data: data,
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "white",
                  font: {
                    size: 10,
                  },
                },
              },
            },
          },
        });
      }
    }
  }, [data]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default BarChart;
