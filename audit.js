const PRICING = {
  ChatGPT: { Plus: 20, Team: 25, Enterprise: null },
  Claude: { Pro: 20, Max: 60, Team: 30, Enterprise: null },
  Cursor: { Hobby: 0, Pro: 20, Business: 40, Enterprise: null },
  "GitHub Copilot": { Individual: 10, Business: 19, Enterprise: null },
  Gemini: { Free: 0, Advanced: 20, Ultra: 30, API: null },
  "OpenAI API": { "Pay-as-you-go": null },
  "Anthropic API": { "Pay-as-you-go": null },
  Windsurf: { Free: 0, Pro: 15, Teams: 35, Enterprise: null },
};

/**
 * Audits a single tool entry.
 * @param {Object} entry - { tool, plan, spend, teamSize, useCase }
 * @returns {Object} - { tool, plan, spend, recommendation, savings, reason }
 */
function auditTool({ tool, plan, spend, teamSize, useCase }) {
  let recommendation = "";
  let savings = 0;
  let reason = "";

  // --- ChatGPT ---
  if (tool === "ChatGPT") {
    if (plan === "Team" && teamSize <= 2) {
      recommendation = "Downgrade to Plus";
      savings = spend - 20 * teamSize;
      reason =
        "ChatGPT Team ($25/user) is only cost-effective above ~3 users. At 1–2 users, Plus ($20/user) covers the same core features.";
    } else if (plan === "Enterprise" && teamSize <= 5) {
      recommendation = "Switch to Team plan";
      savings = spend * 0.4;
      reason =
        "Enterprise pricing is designed for 50+ seat deployments with SSO and compliance needs. Teams under 5 rarely need those controls.";
    } else if (useCase === "Coding") {
      recommendation = "Consider Cursor or GitHub Copilot instead";
      savings = spend * 0.25;
      reason =
        "ChatGPT is a general assistant. For coding specifically, Cursor Pro ($20/user) or GitHub Copilot ($10/user) offer inline IDE integration that reduces context-switching cost.";
    }
  }

  // --- Claude ---
  if (tool === "Claude") {
    if (plan === "Team" && teamSize <= 2) {
      recommendation = "Switch to Claude Pro (individual)";
      savings = spend - 20 * teamSize;
      reason =
        "Claude Team pricing is per-seat. For 1–2 people, two Claude Pro subscriptions ($20 each) are equivalent and you avoid the Team plan overhead.";
    } else if (plan === "Max" && teamSize === 1) {
      recommendation = "Evaluate if Pro limit is being hit";
      savings = spend * 0.5;
      reason =
        "Claude Max ($60/mo) is justified only if you're consistently hitting Pro's message limits. Most solo users don't. Try Pro for a month and monitor.";
    }
  }

  // --- Cursor ---
  if (tool === "Cursor") {
    if (plan === "Business" && teamSize === 1) {
      recommendation = "Downgrade to Cursor Pro";
      savings = spend - 20;
      reason =
        "Cursor Business ($40/user) adds admin controls and SSO for teams. Solo developers get no benefit over Pro ($20/user).";
    } else if (plan === "Business" && teamSize <= 2 && useCase !== "Coding") {
      recommendation = "Consider GitHub Copilot Individual instead";
      savings = spend - 10 * teamSize;
      reason =
        "Cursor Business is optimised for heavy coding workflows. For non-coding use cases, GitHub Copilot Individual ($10/user) is substantially cheaper.";
    }
  }

  // --- GitHub Copilot ---
  if (tool === "GitHub Copilot") {
    if (plan === "Enterprise" && teamSize <= 5) {
      recommendation = "Downgrade to Business plan";
      savings = spend - 19 * teamSize;
      reason =
        "GitHub Copilot Enterprise adds custom models and policy controls built for 50+ developer orgs. Teams under 5 are paying for features they cannot use.";
    } else if (useCase === "Writing" || useCase === "Research") {
      recommendation = "Switch to Claude Pro or ChatGPT Plus";
      savings = spend * 0.3;
      reason =
        "GitHub Copilot is purpose-built for code completion. For writing and research workflows, Claude Pro or ChatGPT Plus offer far better value per dollar.";
    }
  }

  // --- Gemini ---
  if (tool === "Gemini") {
    if (plan === "Ultra" && teamSize === 1) {
      recommendation = "Downgrade to Advanced";
      savings = spend - 20;
      reason =
        "Gemini Ultra ($30/mo) targets enterprise and power users. Gemini Advanced ($20/mo) covers the vast majority of individual use cases including 1M context window.";
    }
  }

  // --- Generic: team plan overkill ---
  if (plan === "Team" && teamSize <= 2 && savings === 0) {
    recommendation = "Consider individual plans for each user";
    savings = spend * 0.2;
    reason =
      "Team plans typically cost more per seat than individual plans below ~3 users. Check if the per-seat rate on Team exceeds two individual subscriptions.";
  }

  // --- Generic: enterprise overkill ---
  if (plan === "Enterprise" && teamSize <= 5 && savings === 0) {
    recommendation = "Evaluate Business or Team tier instead";
    savings = spend * 0.45;
    reason =
      "Enterprise plans include SSO, audit logs, and compliance tooling designed for 50+ seat deployments. Teams under 5 rarely utilise — or need — these features.";
  }

  // --- Already optimal ---
  if (savings <= 0 || recommendation === "") {
    recommendation = "No change recommended";
    savings = 0;
    reason =
      "Your current plan and spend appear well-matched to your team size and use case.";
  }

  // Savings can't exceed spend
  savings = Math.min(savings, spend);
  savings = Math.max(savings, 0);

  return {
    tool,
    plan,
    spend,
    recommendation,
    savings: parseFloat(savings.toFixed(2)),
    reason,
  };
}

/**
 * Audits all tools and returns totals.
 * @param {Array} entries - array of { tool, plan, spend, teamSize, useCase }
 * @returns {Object} - { results, totalMonthlySavings, totalAnnualSavings }
 */
function runAudit(entries) {
  const results = entries.map(auditTool);
  const totalMonthlySavings = parseFloat(
    results.reduce((sum, r) => sum + r.savings, 0).toFixed(2),
  );
  const totalAnnualSavings = parseFloat((totalMonthlySavings * 12).toFixed(2));
  return { results, totalMonthlySavings, totalAnnualSavings };
}

// Works in both Node (for tests) and browser (for script.js)
if (typeof module !== "undefined") {
  module.exports = { auditTool, runAudit, PRICING };
}
