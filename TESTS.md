# Automated Tests

This file documents all automated tests written for the audit engine and application behavior.

---

## Planned Audit Engine Tests

### 1. Team Plan Overpayment Detection

File:
tests/audit/team-plan.test.js

Purpose:
Checks whether the audit engine correctly flags unnecessary Team plans for very small teams.

---

### 2. Alternative Tool Recommendation

File:
tests/audit/alternative-tool.test.js

Purpose:
Ensures the engine recommends lower-cost alternatives when feature overlap exists.

---

### 3. Annual Savings Calculation

File:
tests/audit/savings-calculation.test.js

Purpose:
Verifies monthly and annual savings calculations are accurate.

---

### 4. API Pricing Logic

File:
tests/audit/api-pricing.test.js

Purpose:
Validates pricing recommendations for API-based plans.

---

### 5. Already Optimized User Detection

File:
tests/audit/already-optimized.test.js

Purpose:
Ensures users with efficient spending are not shown fake savings opportunities.

---

## Planned Testing Stack

- Vitest or Jest
- GitHub Actions CI
- Automated test execution on push to main branch

Current status:
Planned and documented during MVP development. Full implementation will be added alongside the production audit engine.

---

## Planned Command

```bash
npm test
```
