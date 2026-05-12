# Reflection

## 1. The Hardest Bug I Hit This Week

The hardest bug was the AI-generated audit summary showing "undefined" instead of the actual summary text after the audit ran.

My first hypothesis was that the `generateSummary` function wasn't being called at all. I added a `console.log` before the function call and confirmed it was being reached. So the function was running — but returning undefined.

My second hypothesis was a scoping issue. I checked where I had placed the function in `script.js` and found the real problem: when I first added the function, I accidentally left the body as a comment (`// ... the whole function`) instead of the actual implementation. The function existed but returned nothing, so `summaryText` was undefined and rendered as the string "undefined" in the HTML template.

The fix was replacing the placeholder comment with the real function body. After that the summary rendered correctly. The lesson was to always verify that a function actually contains its implementation before debugging the call site.

---

## 2. A Decision I Reversed Mid-Week

I originally planned to use AI (the Anthropic API) to generate the audit recommendations themselves — not just the summary paragraph, but the actual "switch from Team to Pro" logic.

I reversed this after thinking through what a finance person reviewing the output would think. If the recommendation says "switch to Cursor Pro — estimated saving: $20/month" that number needs to be traceable to a real pricing page. An LLM generating that number could hallucinate it. A finance reviewer who spots one wrong number loses trust in the entire audit.

I switched to deterministic hardcoded rules for all audit logic and reserved the LLM (in this case a templated summary function) only for the narrative paragraph where slight variation is acceptable. This made the audit engine fully testable and every number traceable to PRICING_DATA.md.

---

## 3. What I Would Build in Week 2

First priority: replace localStorage with a real Supabase backend. Right now lead data only lives in the user's browser — if they clear storage, it's gone, and Credex never sees it. A Supabase `leads` table with a simple POST on form submit would fix this in about 2 hours.

Second: real shareable URLs. Currently the share button generates a random ID that doesn't actually load anything. The fix is saving each completed audit as a row in a Supabase `audits` table and building a second page (`/audit.html?id=UUID`) that fetches and renders it. This is the viral loop the product depends on.

Third: live Anthropic API call for the summary with graceful fallback to the current templated version. The fallback already works — adding the real API call on top takes about 30 minutes once you have a key.

Fourth: transactional email via Resend. When someone submits their email, they should receive a copy of their audit. This closes the loop and makes the lead feel real.

---

## 4. How I Used AI Tools

I used Claude as my primary assistant throughout the week — for debugging, code suggestions, documentation writing, and understanding concepts I hadn't encountered before (like how GitHub Actions CI works, what Jest does, and how to structure a GTM document with real unit economics).

What I trusted AI for: explaining concepts, suggesting code structure, writing markdown documentation, catching bugs I described in plain English.

What I didn't trust AI for: the final audit logic numbers (I cross-checked every pricing figure against official vendor pages myself), and the user interview content (those were real conversations).

One specific time the AI was wrong: early in the week I asked for help restructuring the `addToolBtn` innerHTML and the AI accidentally replaced the tool dropdown with a duplicate plan dropdown. Both selectors had `class="plan"` instead of one being `class="tool"`. The audit engine then read the wrong value for the tool name and all recommendations broke. I caught it by checking the rendered HTML in browser DevTools and noticing two plan dropdowns with no tool dropdown.

---

## 5. Self-Rating

### Discipline — 7/10

I committed on 7 distinct calendar days and maintained daily DEVLOG entries. I lost one day to illness which broke momentum mid-week and forced me to compress more work into the final two days than I wanted.

### Code Quality — 6/10

The audit engine logic is readable and the recommendations are defensible. However the codebase is a single large `script.js` with no modularization. A real production codebase would split the audit engine, form handling, and UI rendering into separate files. I also didn't ship working automated tests, which is the biggest code quality gap.

### Design Sense — 8/10

The dashboard UI is polished, uses consistent spacing and color, renders well on mobile, and the audit results page is screenshot-worthy. The glassmorphism cards and gradient hero section look professional without being over-designed.

### Problem Solving — 7/10

I debugged the undefined summary bug, the broken button listeners on Vercel deployment, and the duplicate dropdown issue independently using console.log and browser DevTools. Where I struggled was with unfamiliar tooling — Jest and GitHub Actions were new to me and I ran out of time to implement them properly.

### Entrepreneurial Thinking — 7/10

I thought carefully about the lead-gen funnel, the CTA tiers based on savings amount, and the viral share loop. The ECONOMICS.md and GTM.md documents reflect real thinking about unit economics and distribution channels. Where I fell short was not having time to implement the full backend that would make the lead capture actually work end-to-end.
