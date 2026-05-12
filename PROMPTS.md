# AI Prompts Used

This file documents all AI prompts used in the product and the reasoning behind them.

---

## 1. Audit Summary Prompt

Used after the audit engine runs to generate a personalized ~100-word summary paragraph.

**Full prompt (as it would be sent to the Anthropic API):**

```
You are an AI finance assistant helping startup founders understand their AI tool spending.

Based on the following audit data, write a concise 100-word summary that:
- Mentions the specific tools being used
- States the total potential monthly savings clearly
- Gives one concrete action the user should take first
- Sounds like advice from a knowledgeable CFO, not a generic chatbot
- Avoids filler phrases like "it is important to note" or "in conclusion"

Audit data:
- Tools used: {tool_list}
- Team size: {team_size}
- Primary use case: {use_case}
- Total monthly savings identified: ${total_monthly_savings}
- Total annual savings identified: ${total_annual_savings}

Write only the summary paragraph. No headings, no bullet points, no preamble.
```

**Why written this way:**

- Explicit word count keeps the output tight and scannable
- "Sounds like a CFO" steers away from generic AI tone
- Forbidding filler phrases reduces hallucinated padding
- Asking for one concrete action gives the user a clear next step

**What didn't work:**

- An earlier version without the word count produced 300-word essays
- Asking for "key insights" produced bullet points instead of a paragraph
- Without "no preamble" the model would start with "Certainly! Here is your summary..."

---

## 2. Current Implementation — Templated Fallback

The Anthropic API call is not live in the current deployment due to time constraints on obtaining API credentials. The product uses a deterministic templated summary instead, which produces accurate output based on the same inputs the prompt would receive.

The fallback function in `script.js`:

```javascript
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
```

The live API call would replace this function with a fetch to `api.anthropic.com/v1/messages`, with this fallback used if the call fails or times out.

---

## 3. Why AI Was Not Used for Audit Logic

The audit engine uses deterministic if/else rules, not AI generation. This was a deliberate decision:

- Financial recommendations must be traceable — every savings number in the output links to a real pricing page in PRICING_DATA.md
- LLMs can hallucinate pricing figures, which would destroy user trust the moment one number is wrong
- Deterministic logic is fully testable — the same inputs always produce the same outputs
- A finance-literate reviewer can read the rules and agree or disagree with each one

AI is the right tool for the narrative summary (tone, personalization, readability). It is the wrong tool for the numbers.
