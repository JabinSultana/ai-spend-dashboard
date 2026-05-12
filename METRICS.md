# Product Metrics

## North Star Metric

**Qualified leads generated per week** — defined as a completed audit where the user also submitted their email.

This is the North Star because it captures both product value (they finished the audit) and business value (Credex has a way to follow up). Raw audit completions don't matter if nobody hands over contact details. Raw email signups don't matter if the audit showed no savings. The intersection is what drives revenue.

---

## Why Not DAU or Weekly Audits Alone

This is a tool people use once or twice — not daily. DAU is the wrong metric for a B2B lead-gen tool with a quarterly use cycle. Weekly audit completions alone don't capture business value. The North Star must reflect both sides of the exchange.

---

## 3 Input Metrics That Drive the North Star

### 1. Audit Completion Rate

**Definition:** Audits completed ÷ audit forms started  
**Target:** ≥ 35%  
**Why it matters:** If users start the form and abandon it, the product is too complex or the value isn't clear enough upfront. Below 25% triggers a redesign of the form flow.

### 2. Email Capture Rate (Post-Audit)

**Definition:** Emails submitted ÷ audits completed  
**Target:** ≥ 25%  
**Why it matters:** Users who see their savings number and still don't give an email means the value proposition isn't landing. Below 15% means the results page needs a stronger CTA or the savings numbers aren't compelling enough.

### 3. High-Savings Rate

**Definition:** Audits showing >$200/mo savings ÷ total audits completed  
**Target:** ≥ 20%  
**Why it matters:** The Credex consultation CTA only appears for >$500/mo savings. If too few audits hit that threshold, either the pricing data is wrong, or the tool is attracting users who are already well-optimized. This metric tells us whether the product is reaching the right audience.

---

## First Instrumentation Priorities

In order of implementation:

1. `audit_started` — user clicks Generate Audit
2. `audit_completed` — results render on screen
3. `email_submitted` — lead form submitted successfully
4. `share_link_generated` — share button clicked
5. `consultation_cta_clicked` — high-savings CTA clicked
6. `time_to_complete` — seconds between audit_started and audit_completed

Tool: Plausible Analytics (privacy-friendly, no cookie banner needed, $9/mo) or Posthog free tier for funnel analysis.

---

## Pivot Thresholds

| Metric                      | Current Target        | Pivot If                          |
| --------------------------- | --------------------- | --------------------------------- |
| Audit completion rate       | ≥ 35%                 | < 20% after 500 sessions          |
| Email capture rate          | ≥ 25%                 | < 10% after 200 completions       |
| High-savings rate           | ≥ 20%                 | < 8% after 300 audits             |
| Consultation CTA click rate | ≥ 10% of high-savings | < 3% after 50 high-savings audits |

If audit completion drops below 20%, the hypothesis is the form is too long or asks for too much upfront. Test: collapse to a single-tool audit first, show partial results, then prompt for more tools.

If email capture drops below 10%, the hypothesis is the value shown isn't compelling enough to justify giving an email. Test: show savings number before the email gate, not after.

---

## What Week-1 Success Looks Like

- 300+ audits completed
- 75+ emails captured
- 5+ share links generated and clicked by a second user
- At least 1 consultation CTA click from a >$500/mo savings audit
