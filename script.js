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
// Sidebar Active Menu

const menuItems = document.querySelectorAll(".menu li");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuItems.forEach((li) => {
      li.classList.remove("active");
    });

    item.classList.add("active");
  });
});
// Upgrade Button

const upgradeBtn = document.querySelector(".upgrade-btn");

upgradeBtn.addEventListener("click", () => {
  alert("Upgrade feature coming soon 🚀");
});
// Profile Button

const profile = document.querySelector(".profile");

profile.addEventListener("click", () => {
  alert("Admin Profile Panel 👤");
});
// Detailed Report Button

const reportBtn = document.querySelector(".details-btn");

reportBtn.addEventListener("click", () => {
  alert("Detailed AI Spending Report Generated 📊");
});
// Theme Toggle

const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeToggle.innerHTML = "☀️";
  } else {
    themeToggle.innerHTML = "🌙";
  }
});
