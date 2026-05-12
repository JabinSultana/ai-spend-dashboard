# Tests

> **Honest status:** Automated test infrastructure (Jest + GitHub Actions CI) was planned but not fully implemented due to time constraints in the 7-day window. The audit engine logic was manually verified against all scenarios below before submission. Full test implementation is the first technical priority for Week 1.

---

## Manual Test Results — Audit Engine

All scenarios below were tested manually in the browser before submission. Each input was entered into the audit form and the output was verified against expected behaviour.

### 1. Team Plan Overpayment Detection

**Input:** ChatGPT, Team plan, $50/month, 2 users, Mixed use case  
**Expected:** Flags team plan as overkill, recommends Plus, shows savings > $0  
**Result:** ✅ Recommendation shown — "Switch from Team to Plus plan", savings calculated correctly

---

### 2. Alternative Tool Recommendation for Coding Use Case

**Input:** ChatGPT, Plus plan, $20/month, 1 user, Coding use case  
**Expected:** Recommends Cursor or GitHub Copilot as better fit for coding  
**Result:** ✅ Recommendation shown — "Consider Cursor or GitHub Copilot instead"

---

### 3. Annual Savings Calculation Accuracy

**Input:** Cursor, Business plan, $40/month, 1 user, Coding use case  
**Expected:** Monthly savings = $20, Annual savings = $240  
**Result:** ✅ Results show $20.00/month and $240.00/year correctly

---

### 4. API Direct High Spend Detection

**Input:** OpenAI API, API Direct, $300/month, 1 user, Mixed use case  
**Expected:** Flags high API spend, recommends caching and prompt compression  
**Result:** ✅ Recommendation shown with reason about redundant API calls

---

### 5. Already Optimised User — No Fake Savings

**Input:** GitHub Copilot, Individual plan, $10/month, 1 user, Coding use case  
**Expected:** No savings manufactured, message says spending is healthy  
**Result:** ✅ Shows "No change recommended" with $0.00 savings

---

## Planned Automated Test Stack (Week 2)

```bash
npm install --save-dev jest
npm test
```

Test files to be created:

- `tests/audit.test.js` — covers all 5 scenarios above as automated Jest tests
- `.github/workflows/ci.yml` — runs lint + tests on every push to main

The audit engine logic is written as pure functions in `script.js` making it straightforward to extract and test without refactoring the codebase significantly.
