# Reflection

## 1. The hardest bug I hit this week

One of the hardest issues I faced was getting the dashboard layout and responsive behavior to work correctly across different screen sizes. Initially, several sections overlapped or stretched incorrectly when resizing the browser. I first thought the issue was caused by incorrect widths, but after debugging with browser developer tools, I realized the real problem was inconsistent flexbox behavior and missing responsive rules. I experimented with flex-wrap, media queries, spacing adjustments, and width constraints until the layout became stable. This taught me the importance of testing UI behavior continuously instead of only focusing on desktop view during development.

---

## 2. A decision I reversed mid-week

Originally, I planned to keep the dashboard extremely minimal and static. However, after reviewing modern SaaS dashboard designs and comparing them to my initial layout, I realized the UI lacked engagement and visual clarity. I decided to redesign the dashboard using better spacing, gradients, glassmorphism effects, hover animations, and a more structured hierarchy. Reworking the design took additional time, but the final result looked significantly more professional and visually appealing.

---

## 3. What I would build in week 2

If given another week, I would begin transforming the project into a fully functional full-stack application. The first priority would be implementing the real audit engine logic and persistent storage using a backend service like Supabase or Firebase. After that, I would add email capture, AI-generated summaries using an LLM API, public shareable audit URLs, and authentication for saved reports. I would also improve accessibility, add loading states, and optimize performance for mobile users.

---

## 4. How I used AI tools

I used AI tools primarily for learning, debugging assistance, UI improvement suggestions, and understanding better frontend practices. I did not rely on AI to blindly generate the entire project. Instead, I used it as a guide while still making decisions manually and understanding the code before implementing it. One example where AI was wrong was during dashboard layout adjustments — one suggested structure caused broken alignment and missing section containers. I caught the issue by checking the actual HTML hierarchy and manually correcting the layout structure.

---

## 5. Self-rating

### Discipline — 8/10

I remained consistent with development progress even after missing one day due to illness.

### Code Quality — 7/10

The codebase is organized and readable, though there is still room for better scalability and component structure.

### Design Sense — 8/10

I significantly improved the visual quality of the dashboard and focused on modern UI patterns.

### Problem Solving — 8/10

I spent time debugging layout and interaction issues independently before finalizing solutions.

### Entrepreneurial Thinking — 7/10

I thought beyond coding by considering product positioning, user acquisition, and business metrics.
