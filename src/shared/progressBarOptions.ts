export const progressBarOptions = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    y: {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    x: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};
