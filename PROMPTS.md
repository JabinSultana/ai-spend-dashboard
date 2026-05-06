# AI Prompts Used

This file documents how AI was used in the project for generating summaries and assisting with UX copy.

---

## 1. Audit Summary Prompt

Used to generate personalized AI spend summary after audit calculation.

**Prompt:**
You are an AI finance assistant. Based on the following AI tool usage data, generate a 100-word concise summary of spending inefficiencies, optimization suggestions, and savings potential. Be precise, practical, and avoid fluff.

User Data:

- Tools used: {tool_list}
- Monthly spend: {total_spend}
- Team size: {team_size}
- Primary use case: {use_case}

Output:
A short professional summary.

---

## 2. Fallback Logic

If the AI API fails:

- Use a static template summary
- Ensure the audit still works without interruption
- Do NOT block user experience

Fallback example:
"Based on your current AI tool usage, there may be opportunities to optimize costs by switching plans or consolidating tools."

---

## 3. Design Assistance Prompt

Used to improve UI suggestions and dashboard layout ideas.

Prompt:
Suggest modern SaaS dashboard UI improvements for an AI spend tracking application. Focus on clarity, hierarchy, and professional design patterns.

---

## 4. Key Principle

AI was used for:

- summarization
- UX copy suggestions
- brainstorming improvements

NOT used for:

- core audit logic
- pricing calculations
- financial decision rules

---

## 5. Why AI Was Limited

I intentionally limited AI usage to summarization and UX-related tasks instead of financial calculations. Audit recommendations and savings calculations were implemented using deterministic logic because financial recommendations should remain explainable, predictable, and testable.

This decision reduced hallucination risk and made the audit engine easier to validate during testing.
