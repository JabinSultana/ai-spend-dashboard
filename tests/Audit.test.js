const { auditTool, runAudit } = require("../audit");

// 1. Team plan overkill — small team on ChatGPT Team should be flagged
test("flags ChatGPT Team plan for team of 2 or fewer", () => {
  const result = auditTool({
    tool: "ChatGPT",
    plan: "Team",
    spend: 50,
    teamSize: 2,
    useCase: "Mixed",
  });

  expect(result.savings).toBeGreaterThan(0);
  expect(result.recommendation).not.toBe("No change recommended");
});

// 2. Solo developer on Cursor Business should be downgraded to Pro
test("recommends Cursor Pro over Business for solo developer", () => {
  const result = auditTool({
    tool: "Cursor",
    plan: "Business",
    spend: 40,
    teamSize: 1,
    useCase: "Coding",
  });

  expect(result.savings).toBeGreaterThan(0);
  expect(result.recommendation.toLowerCase()).toContain("pro");
});

// 3. Already-optimal user should NOT have savings manufactured
test("returns zero savings for well-matched plan", () => {
  const result = auditTool({
    tool: "GitHub Copilot",
    plan: "Individual",
    spend: 10,
    teamSize: 1,
    useCase: "Coding",
  });

  expect(result.savings).toBe(0);
  expect(result.recommendation).toBe("No change recommended");
});

// 4. Annual savings = monthly × 12
test("annual savings is exactly 12x monthly savings", () => {
  const entries = [
    { tool: "Cursor", plan: "Business", spend: 40, teamSize: 1, useCase: "Coding" },
    { tool: "ChatGPT", plan: "Team", spend: 50, teamSize: 2, useCase: "Mixed" },
  ];

  const { totalMonthlySavings, totalAnnualSavings } = runAudit(entries);
  expect(totalAnnualSavings).toBeCloseTo(totalMonthlySavings * 12, 2);
});

// 5. Savings can never exceed the declared spend (no negative bills)
test("savings never exceeds declared spend", () => {
  const entries = [
    { tool: "ChatGPT", plan: "Enterprise", spend: 30, teamSize: 2, useCase: "Mixed" },
    { tool: "Claude", plan: "Max", spend: 10, teamSize: 1, useCase: "Writing" },
    { tool: "Gemini", plan: "Ultra", spend: 5, teamSize: 1, useCase: "Research" },
  ];

  const { results } = runAudit(entries);
  results.forEach((r) => {
    expect(r.savings).toBeLessThanOrEqual(r.spend);
    expect(r.savings).toBeGreaterThanOrEqual(0);
  });
});