import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

type CaloriesBurningChartProps = {
  caloriesData: number[] | undefined; // Passar os dados de calorias como propriedade
};

export const CaloriesBurningChart: React.FC<CaloriesBurningChartProps> = ({
  caloriesData,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chart, setChart] = useState<Chart<
    "doughnut",
    number[],
    string
  > | null>(null);

  useEffect(() => {
    if (canvasRef.current && caloriesData) {
      // Se já existe um gráfico, destrua-o antes de criar um novo
      if (chart) chart.destroy();

      // Cria um novo gráfico
      const newChart = new Chart(canvasRef.current, {
        type: "doughnut",
        data: {
          labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
          datasets: [
            {
              label: "Semanal",
              data: caloriesData,
              backgroundColor: [
                "#ADD8E6",
                "#7FFFD4",
                "#FFD700",
                "#FF007F",
                "#8A2BE2",
                "#000080",
                "#50C878",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "right",
              labels: {
                usePointStyle: true,
              },
            },
          },
        },
      });

      setChart(newChart);
    }

    // Função de limpeza para destruir o gráfico quando o componente é desmontado
    return () => {
      if (chart) chart.destroy();
    };
  }, [caloriesData]);

  return <canvas ref={canvasRef} />;
};
