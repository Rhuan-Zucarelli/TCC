import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { User } from "@prisma/client";

type GraphicProgressProps = {
  user: User | undefined;
  caloriesData: number[] | [];
};

export const GraphicProgress: React.FC<GraphicProgressProps> = ({
  user,
  caloriesData,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chart, setChart] = useState<Chart<"line", number[], string> | null>(
    null
  );

  useEffect(() => {
    if (canvasRef.current && caloriesData) {
      // Cria um identificador exclusivo para o elemento Canvas
      const canvasId = `canvas-${Math.random()}`;
      canvasRef.current.id = canvasId;

      // Verifica se já existe um gráfico com o mesmo identificador e o destrói
      const existingChart = Chart.getChart(canvasId);
      if (existingChart) {
        existingChart.destroy();
      }

      // Cria um novo gráfico
      const newChart = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
          datasets: [
            {
              label: "Semanal",
              data: caloriesData,
              fill: false,
              borderColor: "blue",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: (user?.weight ?? 85) + "KG",
              padding: {
                top: 10,
                bottom: 30,
              },
              font: {
                size: 50,
                weight: "bold",
              },
            },
          },
        },
      });

      setChart(newChart);
    }

    // Função de limpeza para destruir o gráfico quando o componente é desmontado
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [user, caloriesData]);

  return <canvas ref={canvasRef} />;
};
