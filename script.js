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

// =========================
// AI Spend Audit Logic
// =========================

const auditForm = document.getElementById("auditForm");

auditForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get Values
  const tool = document.getElementById("tool").value;
  const plan = document.getElementById("plan").value;
  const spend = document.getElementById("spend").value;
  const teamSize = document.getElementById("teamSize").value;
  const useCase = document.getElementById("useCase").value;

  // Save to localStorage
  const auditData = {
    tool,
    plan,
    spend,
    teamSize,
    useCase,
  };

  localStorage.setItem("auditData", JSON.stringify(auditData));

  // =========================
  // Smarter Audit Logic
  // =========================

  let recommendation = "";
  let savings = 0;

  // Team plan overkill
  if (plan === "Team" && teamSize <= 2) {
    recommendation =
      "Your team size is very small for a Team plan. Downgrading to a Pro plan may reduce unnecessary spending.";

    savings = spend * 0.35;
  }

  // Enterprise overkill
  else if (plan === "Enterprise" && teamSize < 10) {
    recommendation =
      "Enterprise plans are usually optimized for larger organizations. A lower-tier plan may provide better cost efficiency.";

    savings = spend * 0.4;
  }

  // Coding use case
  else if (tool === "ChatGPT" && useCase === "Coding") {
    recommendation =
      "Developer-focused tools like Cursor or GitHub Copilot may offer better coding productivity for lower cost.";

    savings = spend * 0.25;
  }

  // Writing use case
  else if (tool === "Cursor" && useCase === "Writing") {
    recommendation =
      "Cursor is optimized for coding workflows. A writing-focused AI tool could reduce costs while improving fit.";

    savings = spend * 0.2;
  }

  // High spend detection
  else if (spend > 500) {
    recommendation =
      "Your monthly AI spending is relatively high. Consolidating overlapping tools may significantly reduce expenses.";

    savings = spend * 0.15;
  }

  // Optimized case
  else {
    recommendation =
      "Your current AI spending setup appears reasonably optimized with no major inefficiencies detected.";

    savings = 0;
  }

  // Display Result
  displayAuditResult(tool, recommendation, savings);
});

// =========================
// Display Audit Result
// =========================

function displayAuditResult(tool, recommendation, savings) {
  let existingResult = document.querySelector(".audit-result");

  if (existingResult) {
    existingResult.remove();
  }

  const resultDiv = document.createElement("div");

  resultDiv.classList.add("audit-result");

  resultDiv.innerHTML = `
    <h2>Audit Result</h2>

    <p><strong>Tool:</strong> ${tool}</p>

    <p><strong>Recommendation:</strong> ${recommendation}</p>

    <p><strong>Estimated Savings:</strong> $${savings.toFixed(2)}/month</p>
  `;

  document.querySelector(".audit-form-section").appendChild(resultDiv);
}

// =========================
// Load Saved Data
// =========================

window.addEventListener("load", () => {
  const savedData = localStorage.getItem("auditData");

  if (savedData) {
    const auditData = JSON.parse(savedData);

    document.getElementById("tool").value = auditData.tool;

    document.getElementById("plan").value = auditData.plan;

    document.getElementById("spend").value = auditData.spend;

    document.getElementById("teamSize").value = auditData.teamSize;

    document.getElementById("useCase").value = auditData.useCase;
  }
});
