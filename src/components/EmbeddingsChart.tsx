import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

export default function EmbeddingsChart({ embeddings, texts, clusters }) {
  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          drawTicks: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          drawTicks: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            return label;
          },
        },
      },
    },
  };

  let colors = [
    ...clusters[0].map((x) => ["#FFAEBC", x]),
    ...clusters[1].map((x) => ["#A0E7E5", x]),
    ...clusters[2].map((x) => ["#B4F8C8", x]),
    ...clusters[3].map((x) => ["#FBE7C6", x]),
  ];
  colors.sort((a, b) => a[1] - b[1]);
  colors = colors.map((x) => x[0]);

  const data = {
    labels: texts,
    datasets: [
      {
        data: embeddings.map((e) => ({ x: e[0], y: e[1] })),
        backgroundColor: colors,
      },
    ],
  };

  return <Scatter options={options} data={data} />;
}
