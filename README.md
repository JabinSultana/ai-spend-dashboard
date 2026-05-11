# AI Spend Audit Dashboard

A web application that analyzes AI tool spending and provides optimization recommendations for teams and individuals.

## Project Status

Currently in active development as part of the Credex internship assignment.

## Preview

[Screenshots or Loom/YouTube demo link will be added before final submission]

## Current Features

- Modern AI dashboard UI
- Interactive analytics cards
- AI spend visualization chart
- Dark/light mode toggle
- Responsive design
- GitHub version control setup
- Dynamic AI Spend Audit Form
- Smart Recommendation Engine
- Estimated Monthly Savings Calculation
- Persistent Form Data using localStorage

## Tech Stack

- HTML
- CSS
- JavaScript
- Chart.js

## Developer

Built by Jabin Sultana

## Quick Start

Clone the repository:

```bash
git clone <your-repo-url>
```

Open the project folder:

```bash
cd ai-spend-dashboard
```

Run locally using VS Code Live Server or any static web server.

---

## Deployment

The application can be deployed using Vercel, Netlify, or GitHub Pages.

---

## Decisions

### 1. Vanilla JavaScript Instead of Frameworks

I chose vanilla JavaScript to focus on frontend fundamentals and rapid MVP development before introducing framework complexity.

### 2. Hardcoded Audit Logic

Audit calculations use deterministic rules instead of AI-generated recommendations to keep financial suggestions explainable and testable.

### 3. localStorage Persistence

I used localStorage persistence to satisfy the requirement for form persistence without requiring backend infrastructure during MVP development.

### 4. Shareable Audit Flow

The public report sharing feature was simplified using generated URLs and browser storage to prototype viral sharing behavior quickly.

### 5. Dashboard-First UI

I prioritized a modern dashboard experience because the audit results page is intended to be screenshot-friendly and visually shareable.

---

## Live Demo

Deployed URL:
https://ai-spend-dashboard-5cjo6cs4h-jabinsultanas-projects.vercel.app/
