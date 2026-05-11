const auditForm = document.getElementById("auditForm");
const auditResult = document.getElementById("auditResult");
const toolsContainer = document.getElementById("toolsContainer");
const addToolBtn = document.getElementById("addToolBtn");
/* Auto Save Form Data */

function saveFormState() {
  const toolEntries = document.querySelectorAll(".tool-entry");

  const formData = [];

  toolEntries.forEach((entry) => {
    formData.push({
      tool: entry.querySelector(".tool").value,

      plan: entry.querySelector(".plan").value,

      spend: entry.querySelector(".spend").value,

      teamSize: entry.querySelector(".teamSize").value,

      useCase: entry.querySelector(".useCase").value,
    });
  });

  localStorage.setItem("auditFormData", JSON.stringify(formData));
}

/* Add New Tool */

addToolBtn.addEventListener("click", () => {
  const toolEntry = document.createElement("div");

  toolEntry.classList.add("form-grid", "tool-entry");

  toolEntry.innerHTML = `
    <div class="form-group">
      <label>AI Tool</label>

      <select class="tool">
        <option value="ChatGPT">ChatGPT</option>
        <option value="Claude">Claude</option>
        <option value="Cursor">Cursor</option>
        <option value="GitHub Copilot">
          GitHub Copilot
        </option>
        <option value="Gemini">Gemini</option>
      </select>
    </div>

    <div class="form-group">
      <label>Plan</label>

      <select class="plan">
        <option value="Free">Free</option>
        <option value="Pro">Pro</option>
        <option value="Team">Team</option>
        <option value="Enterprise">
          Enterprise
        </option>
      </select>
    </div>

    <div class="form-group">
      <label>Monthly Spend ($)</label>

      <input
        type="number"
        class="spend"
        placeholder="Enter monthly spend"
      />
    </div>

    <div class="form-group">
      <label>Team Size</label>

      <input
        type="number"
        class="teamSize"
        placeholder="Enter team size"
      />
    </div>

    <div class="form-group">
      <label>Primary Use Case</label>

      <select class="useCase">
        <option value="Coding">Coding</option>
        <option value="Writing">Writing</option>
        <option value="Research">Research</option>
        <option value="Data Analysis">
          Data Analysis
        </option>
        <option value="Mixed">Mixed</option>
      </select>
    </div>
  `;

  toolsContainer.appendChild(toolEntry);
});
/* Save Form On Change */

document.addEventListener("input", () => {
  saveFormState();
});

document.addEventListener("change", () => {
  saveFormState();
});

/* Audit Engine */

auditForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const toolEntries = document.querySelectorAll(".tool-entry");

  let totalSavings = 0;
  let resultsHTML = "";

  toolEntries.forEach((entry) => {
    const tool = entry.querySelector(".tool").value;

    const plan = entry.querySelector(".plan").value;

    const spend = Number(entry.querySelector(".spend").value);

    const teamSize = Number(entry.querySelector(".teamSize").value);

    const useCase = entry.querySelector(".useCase").value;

    let recommendation = "";
    let savings = 0;

    /* ChatGPT */

    if (tool === "ChatGPT" && plan === "Team" && teamSize <= 2) {
      recommendation = "Switch from Team to Plus plan for small teams.";

      savings = spend * 0.4;
    } else if (tool === "Claude" && spend > 40) {
      /* Claude */
      recommendation =
        "Claude usage appears high. Consider optimizing API usage or switching plans.";

      savings = spend * 0.25;
    } else if (tool === "Cursor" && teamSize === 1 && plan === "Business") {
      /* Cursor */
      recommendation = "Cursor Business is unnecessary for solo developers.";

      savings = spend * 0.5;
    } else if (
      /* GitHub Copilot */
      tool === "GitHub Copilot" &&
      plan === "Enterprise" &&
      teamSize < 5
    ) {
      recommendation =
        "GitHub Copilot Enterprise may be excessive for smaller teams.";

      savings = spend * 0.35;
    } else if (tool === "Gemini" && spend > 30) {
      /* Gemini */
      recommendation = "Gemini usage could be optimized with lower-cost plans.";

      savings = spend * 0.2;
    } else {
      /* Optimized */
      recommendation =
        "Your current AI spending setup appears reasonably optimized with no major inefficiencies detected.";

      savings = 0;
    }

    /* Smart Logic */

    if (plan === "Team" && teamSize <= 2) {
      recommendation = "Small teams may not need Team plans. Consider Pro.";

      savings = spend * 0.3;
    }

    if (plan === "Enterprise" && teamSize <= 5) {
      recommendation = "Enterprise may be unnecessary for smaller teams.";

      savings = spend * 0.5;
    }

    if (useCase === "Coding" && tool === "ChatGPT") {
      recommendation =
        "Cursor or GitHub Copilot may provide better coding value.";

      savings = spend * 0.2;
    }

    if (spend > 500) {
      recommendation =
        "High monthly spend detected. Consider consolidating tools.";

      savings = spend * 0.25;
    }

    totalSavings += savings;

    resultsHTML += `
      <div class="result-card">

        <h3>${tool}</h3>

        <p>
          <strong>Recommendation:</strong>
          ${recommendation}
        </p>

        <p>
          <strong>Estimated Savings:</strong>
          $${savings.toFixed(2)}/month
        </p>

      </div>
    `;
  });

  const annualSavings = totalSavings * 12;
  let ctaMessage = "";

  if (totalSavings >= 500) {
    ctaMessage = `
    <div class="cta-box high-savings">

      <h2>
        🚀 You Could Save Big With Credex
      </h2>

      <p>
        Your audit shows significant AI overspending.
        Credex can help optimize your AI infrastructure
        and unlock even more savings.
      </p>

      <button class="cta-btn">
        Book Credex Consultation
      </button>

    </div>
  `;
  } else if (totalSavings < 100) {
    ctaMessage = `
    <div class="cta-box optimized">

      <h2>
        ✅ Your AI Spending Looks Healthy
      </h2>

      <p>
        No major inefficiencies were detected.
        Stay updated when new optimization
        opportunities become available.
      </p>

      <button class="cta-btn">
        Notify Me Later
      </button>

    </div>
  `;
  } else {
    ctaMessage = `
    <div class="cta-box medium-savings">

      <h2>
        💡 Moderate Savings Opportunity
      </h2>

      <p>
        Your stack has some optimization potential.
        Small changes could reduce monthly AI costs.
      </p>

      <button class="cta-btn">
        Explore Recommendations
      </button>

    </div>
  `;
  }

  auditResult.innerHTML = `
    <div class="total-savings">

      <h2>Total Potential Savings</h2>

      <h1>$${totalSavings.toFixed(2)}/month</h1>

      <h3>
        $${annualSavings.toFixed(2)}/year
      </h3>

    </div>
    ${ctaMessage}
    ${resultsHTML}
  `;
});
const ctx = document.getElementById("spendChart").getContext("2d");

new Chart(ctx, {
  type: "line",

  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

    datasets: [
      {
        label: "AI Spend ($)",

        data: [400, 650, 800, 950, 1200, 1500],

        borderColor: "#38bdf8",

        backgroundColor: "rgba(56, 189, 248, 0.2)",

        tension: 0.4,

        fill: true,
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
      y: {
        ticks: {
          color: "#cbd5e1",
        },

        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },

      x: {
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
/* Lead Capture */

const leadForm = document.getElementById("leadForm");

const leadMessage = document.getElementById("leadMessage");

leadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  const company = document.getElementById("company").value;

  const role = document.getElementById("role").value;

  const leadTeamSize = document.getElementById("leadTeamSize").value;

  /* Save to Local Storage */

  const leadData = {
    email,
    company,
    role,
    leadTeamSize,
  };

  localStorage.setItem("leadData", JSON.stringify(leadData));

  leadMessage.innerHTML = "✅ Report saved successfully!";

  leadForm.reset();
});

/* Restore Saved Form Data */

window.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("auditFormData"));

  if (!savedData || savedData.length === 0) return;

  toolsContainer.innerHTML = "";

  savedData.forEach((item) => {
    const toolHTML = `
      <div class="form-grid tool-entry">

        <div class="form-group">
          <label>AI Tool</label>

          <select class="tool">
            <option value="ChatGPT"
              ${item.tool === "ChatGPT" ? "selected" : ""}>
              ChatGPT
            </option>

            <option value="Claude"
              ${item.tool === "Claude" ? "selected" : ""}>
              Claude
            </option>

            <option value="Cursor"
              ${item.tool === "Cursor" ? "selected" : ""}>
              Cursor
            </option>

            <option value="GitHub Copilot"
              ${item.tool === "GitHub Copilot" ? "selected" : ""}>
              GitHub Copilot
            </option>

            <option value="Gemini"
              ${item.tool === "Gemini" ? "selected" : ""}>
              Gemini
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Plan</label>

          <select class="plan">
            <option value="Free"
              ${item.plan === "Free" ? "selected" : ""}>
              Free
            </option>

            <option value="Pro"
              ${item.plan === "Pro" ? "selected" : ""}>
              Pro
            </option>

            <option value="Team"
              ${item.plan === "Team" ? "selected" : ""}>
              Team
            </option>

            <option value="Enterprise"
              ${item.plan === "Enterprise" ? "selected" : ""}>
              Enterprise
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Monthly Spend ($)</label>

          <input
            type="number"
            class="spend"
            value="${item.spend}"
            placeholder="Enter monthly spend"
          />
        </div>

        <div class="form-group">
          <label>Team Size</label>

          <input
            type="number"
            class="teamSize"
            value="${item.teamSize}"
            placeholder="Enter team size"
          />
        </div>

        <div class="form-group">
          <label>Primary Use Case</label>

          <select class="useCase">

            <option value="Coding"
              ${item.useCase === "Coding" ? "selected" : ""}>
              Coding
            </option>

            <option value="Writing"
              ${item.useCase === "Writing" ? "selected" : ""}>
              Writing
            </option>

            <option value="Research"
              ${item.useCase === "Research" ? "selected" : ""}>
              Research
            </option>

            <option value="Data Analysis"
              ${item.useCase === "Data Analysis" ? "selected" : ""}>
              Data Analysis
            </option>

            <option value="Mixed"
              ${item.useCase === "Mixed" ? "selected" : ""}>
              Mixed
            </option>

          </select>
        </div>

      </div>
    `;

    toolsContainer.innerHTML += toolHTML;
  });
});
/* Share Audit Report */

const shareBtn = document.getElementById("shareBtn");

const shareMessage = document.getElementById("shareMessage");

shareBtn.addEventListener("click", () => {
  const auditData = localStorage.getItem("auditFormData");

  if (!auditData) {
    shareMessage.innerHTML = "⚠ Generate an audit first.";

    return;
  }

  /* Create fake shareable URL */

  const shareId = Math.random().toString(36).substring(2, 10);

  const shareURL = `${window.location.origin}${window.location.pathname}?report=${shareId}`;

  navigator.clipboard.writeText(shareURL);

  shareMessage.innerHTML = "✅ Shareable report link copied!";
});

/* =========================
   TOPBAR BUTTON FEATURES
========================= */

/* Theme Toggle */

const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeToggle.innerHTML = "☀️";
  } else {
    themeToggle.innerHTML = "🌙";
  }
});

/* Upgrade Button */

const upgradeBtn = document.querySelector(".upgrade-btn");

upgradeBtn.addEventListener("click", () => {
  alert("🚀 Upgrade plans and premium analytics are coming soon!");
});

/* Profile Button */

const profileBtn = document.querySelector(".profile");

profileBtn.addEventListener("click", () => {
  alert("👤 User profile settings will be available in a future update.");
});
