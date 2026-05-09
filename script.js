const ctx = document.getElementById("spendChart");

new Chart(ctx, {
  type: "line",

  data: {
    labels: ["January", "February", "March", "April", "May", "June"],

    datasets: [
      {
        label: "AI Spending",

        data: [4000, 6500, 8000, 7200, 9500, 12500],

        borderColor: "#38bdf8",

        backgroundColor: "rgba(56, 189, 248, 0.2)",

        fill: true,

        tension: 0.4,

        borderWidth: 3,

        pointBackgroundColor: "#ffffff",

        pointBorderColor: "#38bdf8",

        pointRadius: 5,
      },
    ],
  },

  options: {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#cbd5e1",
        },

        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },

      y: {
        ticks: {
          color: "#cbd5e1",
        },

        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },
    },
  },
});
