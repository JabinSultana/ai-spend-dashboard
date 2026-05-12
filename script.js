function generateSummary(entries, totalMonthlySavings, totalAnnualSavings) {
  const toolNames = entries.map((e) => e.tool).join(", ");
  const teamSize = entries[0]?.teamSize || 1;
  const useCase = entries[0]?.useCase || "mixed";
  const savingsText =
    totalMonthlySavings > 0
      ? `Based on your current stack, you could save $${totalMonthlySavings.toFixed(2)}/month ($${totalAnnualSavings.toFixed(2)}/year) by adjusting your plans.`
      : `Your current AI stack appears well-optimized for your team size and use case.`;

  return `Your team of ${teamSize} is currently using ${toolNames} for ${useCase} workflows. ${savingsText} ${
    totalMonthlySavings >= 500
      ? "This is a significant savings opportunity — consolidating tools and right-sizing plans could materially reduce your AI infrastructure costs."
      : totalMonthlySavings > 0
        ? "Small plan adjustments and tool consolidation can compound into meaningful annual savings."
        : "Continue monitoring usage as your team grows — plan mismatches often emerge at 5+ seats."
  }`;
}

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
        <option value="GitHub Copilot">GitHub Copilot</option>
        <option value="Gemini">Gemini</option>
        <option value="OpenAI API">OpenAI API Direct</option>
        <option value="Anthropic API">Anthropic API Direct</option>
        <option value="Windsurf">Windsurf</option>
      </select>
    </div>

    <div class="form-group">
      <label>Plan</label>
      <select class="plan">
        <option value="Free">Free</option>
        <option value="Pro">Pro</option>
        <option value="Max">Max</option>
        <option value="Team">Team</option>
        <option value="Business">Business</option>
        <option value="Enterprise">Enterprise</option>
        <option value="Individual">Individual</option>
        <option value="API Direct">API Direct</option>
      </select>
    </div>

    <div class="form-group">
      <label>Monthly Spend ($)</label>
      <input type="number" class="spend" placeholder="Enter monthly spend" />
    </div>

    <div class="form-group">
      <label>Team Size</label>
      <input type="number" class="teamSize" placeholder="Enter team size" />
    </div>

    <div class="form-group">
      <label>Primary Use Case</label>
      <select class="useCase">
        <option value="Coding">Coding</option>
        <option value="Writing">Writing</option>
        <option value="Research">Research</option>
        <option value="Data Analysis">Data Analysis</option>
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
    let reason = "";

    /* ChatGPT */
    if (tool === "ChatGPT" && plan === "Team" && teamSize <= 2) {
      recommendation = "Switch from Team to Plus plan.";
      savings = spend * 0.4;
      reason =
        "ChatGPT Team ($25/user) is only cost-effective above 3 users. Plus ($20/user) covers the same features for small teams.";
    } else if (tool === "ChatGPT" && useCase === "Coding") {
      recommendation = "Consider Cursor or GitHub Copilot instead.";
      savings = spend * 0.25;
      reason =
        "ChatGPT is a general assistant. For coding, Cursor Pro ($20/user) or GitHub Copilot ($10/user) offer inline IDE integration worth the switch.";

      /* Claude */
    } else if (tool === "Claude" && plan === "Max" && teamSize === 1) {
      recommendation = "Downgrade to Claude Pro and monitor usage.";
      savings = spend * 0.5;
      reason =
        "Claude Max ($60/mo) is justified only if you consistently hit Pro message limits. Most solo users don't — try Pro for a month first.";
    } else if (tool === "Claude" && plan === "Team" && teamSize <= 2) {
      recommendation = "Switch to two individual Claude Pro plans.";
      savings = spend - 20 * teamSize;
      reason =
        "Two Claude Pro subscriptions ($20 each) cost the same or less than Team pricing for 1–2 users, with no overhead.";

      /* Cursor */
    } else if (tool === "Cursor" && plan === "Business" && teamSize === 1) {
      recommendation = "Downgrade to Cursor Pro.";
      savings = spend - 20;
      reason =
        "Cursor Business ($40/user) adds admin controls for teams. Solo developers get zero benefit over Pro ($20/user).";

      /* GitHub Copilot */
    } else if (
      tool === "GitHub Copilot" &&
      plan === "Enterprise" &&
      teamSize <= 5
    ) {
      recommendation = "Downgrade to Business plan.";
      savings = spend - 19 * teamSize;
      reason =
        "GitHub Copilot Enterprise is built for 50+ developer orgs with custom models and policy controls. Teams under 5 pay for features they cannot use.";

      /* Gemini */
    } else if (tool === "Gemini" && plan === "Ultra" && teamSize === 1) {
      recommendation = "Downgrade to Gemini Advanced.";
      savings = spend - 20;
      reason =
        "Gemini Ultra ($30/mo) targets enterprise users. Advanced ($20/mo) covers 1M context and all individual use cases.";

      /* Windsurf */
    } else if (tool === "Windsurf" && plan === "Teams" && teamSize <= 2) {
      recommendation = "Switch to individual Windsurf Pro plans.";
      savings = spend * 0.3;
      reason =
        "Windsurf Teams pricing is designed for larger groups. Two Pro plans are cheaper for 1–2 person teams.";

      /* API Direct — high spend */
    } else if (
      (tool === "OpenAI API" || tool === "Anthropic API") &&
      spend > 200
    ) {
      recommendation =
        "Audit API usage — implement caching and prompt compression.";
      savings = spend * 0.25;
      reason =
        "High API spend often contains 20–30% waste from redundant calls and verbose prompts. Caching repeated queries alone can cut costs significantly.";
    } else {
      recommendation = "No change recommended.";
      savings = 0;
      reason =
        "Your current plan and spend appear well-matched to your team size and use case.";
    }

    /* Generic overrides */
    if (plan === "Enterprise" && teamSize <= 5 && savings === 0) {
      recommendation = "Evaluate Business or Team tier instead.";
      savings = spend * 0.45;
      reason =
        "Enterprise plans include SSO and compliance tooling for 50+ seat deployments. Teams under 5 rarely need — or use — these features.";
    }

    if (spend > 500 && savings === 0) {
      recommendation = "High spend detected — consolidate overlapping tools.";
      savings = spend * 0.2;
      reason =
        "At this spend level, tool overlap is likely. Auditing which tools your team actually uses weekly can surface quick wins.";
    }

    savings = Math.min(savings, spend);
    savings = Math.max(savings, 0);
    totalSavings += savings;

    resultsHTML += `
      <div class="result-card">
        <h3>${tool} — ${plan}</h3>
        <p><strong>Recommendation:</strong> ${recommendation}</p>
        <p><strong>Why:</strong> ${reason}</p>
        <p><strong>Estimated Savings:</strong> $${savings.toFixed(2)}/month</p>
      </div>
    `;
  });

  const annualSavings = totalSavings * 12;

  const summaryText = generateSummary(
    [...document.querySelectorAll(".tool-entry")].map((entry) => ({
      tool: entry.querySelector(".tool").value,
      teamSize: Number(entry.querySelector(".teamSize").value),
      useCase: entry.querySelector(".useCase").value,
    })),
    totalSavings,
    annualSavings,
  );

  let ctaMessage = "";
  if (totalSavings >= 500) {
    ctaMessage = `
      <div class="cta-box high-savings">
        <h2>🚀 You Could Save Big With Credex</h2>
        <p>Your audit shows significant AI overspending. Credex can help optimize your AI infrastructure and unlock even more savings.</p>
        <button class="cta-btn">Book Credex Consultation</button>
      </div>`;
  } else if (totalSavings < 100) {
    ctaMessage = `
      <div class="cta-box optimized">
        <h2>✅ Your AI Spending Looks Healthy</h2>
        <p>No major inefficiencies detected. Stay updated when new optimization opportunities apply to your stack.</p>
        <button class="cta-btn">Notify Me of New Savings</button>
      </div>`;
  } else {
    ctaMessage = `
      <div class="cta-box medium-savings">
        <h2>💡 Moderate Savings Opportunity</h2>
        <p>Your stack has optimization potential. Small changes could reduce monthly AI costs meaningfully.</p>
        <button class="cta-btn">Explore Recommendations</button>
      </div>`;
  }

  auditResult.innerHTML = `
    <div class="total-savings">
      <h2>Total Potential Savings</h2>
      <h1>$${totalSavings.toFixed(2)}/month</h1>
      <h3>$${annualSavings.toFixed(2)}/year</h3>
    </div>
    ${ctaMessage}
    ${resultsHTML}
    <div class="summary-card">
      <h3>📋 AI-Generated Audit Summary</h3>
      <p>${summaryText}</p>
    </div>
  `;
});

/* Chart */
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
    plugins: { legend: { labels: { color: "#ffffff" } } },
    scales: {
      y: {
        ticks: { color: "#cbd5e1" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      x: {
        ticks: { color: "#cbd5e1" },
        grid: { color: "rgba(255,255,255,0.05)" },
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
  const leadData = { email, company, role, leadTeamSize };
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
            <option value="ChatGPT" ${item.tool === "ChatGPT" ? "selected" : ""}>ChatGPT</option>
            <option value="Claude" ${item.tool === "Claude" ? "selected" : ""}>Claude</option>
            <option value="Cursor" ${item.tool === "Cursor" ? "selected" : ""}>Cursor</option>
            <option value="GitHub Copilot" ${item.tool === "GitHub Copilot" ? "selected" : ""}>GitHub Copilot</option>
            <option value="Gemini" ${item.tool === "Gemini" ? "selected" : ""}>Gemini</option>
            <option value="OpenAI API" ${item.tool === "OpenAI API" ? "selected" : ""}>OpenAI API Direct</option>
            <option value="Anthropic API" ${item.tool === "Anthropic API" ? "selected" : ""}>Anthropic API Direct</option>
            <option value="Windsurf" ${item.tool === "Windsurf" ? "selected" : ""}>Windsurf</option>
          </select>
        </div>
        <div class="form-group">
          <label>Plan</label>
          <select class="plan">
            <option value="Free" ${item.plan === "Free" ? "selected" : ""}>Free</option>
            <option value="Pro" ${item.plan === "Pro" ? "selected" : ""}>Pro</option>
            <option value="Max" ${item.plan === "Max" ? "selected" : ""}>Max</option>
            <option value="Team" ${item.plan === "Team" ? "selected" : ""}>Team</option>
            <option value="Business" ${item.plan === "Business" ? "selected" : ""}>Business</option>
            <option value="Enterprise" ${item.plan === "Enterprise" ? "selected" : ""}>Enterprise</option>
            <option value="Individual" ${item.plan === "Individual" ? "selected" : ""}>Individual</option>
            <option value="API Direct" ${item.plan === "API Direct" ? "selected" : ""}>API Direct</option>
          </select>
        </div>
        <div class="form-group">
          <label>Monthly Spend ($)</label>
          <input type="number" class="spend" value="${item.spend}" placeholder="Enter monthly spend" />
        </div>
        <div class="form-group">
          <label>Team Size</label>
          <input type="number" class="teamSize" value="${item.teamSize}" placeholder="Enter team size" />
        </div>
        <div class="form-group">
          <label>Primary Use Case</label>
          <select class="useCase">
            <option value="Coding" ${item.useCase === "Coding" ? "selected" : ""}>Coding</option>
            <option value="Writing" ${item.useCase === "Writing" ? "selected" : ""}>Writing</option>
            <option value="Research" ${item.useCase === "Research" ? "selected" : ""}>Research</option>
            <option value="Data Analysis" ${item.useCase === "Data Analysis" ? "selected" : ""}>Data Analysis</option>
            <option value="Mixed" ${item.useCase === "Mixed" ? "selected" : ""}>Mixed</option>
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
  const shareId = Math.random().toString(36).substring(2, 10);
  const shareURL = `${window.location.origin}${window.location.pathname}?report=${shareId}`;
  navigator.clipboard.writeText(shareURL);
  shareMessage.innerHTML = "✅ Shareable report link copied!";
});

/* Theme Toggle */
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.innerHTML = document.body.classList.contains("light-mode")
    ? "☀️"
    : "🌙";
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

/* CTA Buttons */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cta-btn")) {
    document
      .querySelector(".lead-section")
      .scrollIntoView({ behavior: "smooth" });
  }
});

/* View Detailed Report */
window.addEventListener("DOMContentLoaded", () => {
  const detailsBtn = document.querySelector(".details-btn");
  if (detailsBtn) {
    detailsBtn.addEventListener("click", () => {
      document
        .querySelector(".audit-form-section")
        .scrollIntoView({ behavior: "smooth" });
    });
  }
});
