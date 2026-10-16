# Leqaa Waleed — Data Engineering & Data Science Portfolio

A complete, responsive, single-page personal portfolio website for **Leqaa Waleed Elsayed Gebril**, an Artificial Intelligence student majoring in Data Science at Menoufia University, Egypt.

---

## 📁 Source Code Organization

As specified in the technical requirements:

```text
portfolio/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

> **Note:** A root-level `index.html` is also included in the repository root to automatically redirect or serve the `portfolio/index.html` file when opened with root-based web servers.

---

## 🚀 How to Run Locally

Because this is a pure static website (HTML5, CSS3, Vanilla JavaScript), no build tools or package managers are required.

### Option 1: Direct Browser Launch
Double-click `portfolio/index.html` (or drag it into Chrome, Edge, Firefox, or Safari).

### Option 2: Python HTTP Server (Recommended)
Open PowerShell or your terminal in this directory and run:

```bash
python -m http.server 8000 --directory portfolio
```
Then visit `http://localhost:8000/` in your browser.

### Option 3: VS Code Live Server
Right-click on `portfolio/index.html` in VS Code and choose **"Open with Live Server"**.

### Option 4: Node.js (npx serve)
```bash
npx -y serve portfolio
```

---

## 🌐 How to Deploy as a Static Website

### 1. GitHub Pages (Free)
1. Push this repository to GitHub.
2. In your repository on GitHub, navigate to **Settings** &rarr; **Pages**.
3. Under **Build and deployment** &rarr; **Source**, select `Deploy from a branch`.
4. Select your branch (`main`) and choose the folder `/ (root)` or `/portfolio`.
5. Click **Save**. Your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`.

### 2. Vercel (Free)
1. Install Vercel CLI (`npm i -g vercel`) or connect your GitHub repository on [vercel.com](https://vercel.com).
2. Set Root Directory to `portfolio` (or leave default).
3. Click **Deploy**.

### 3. Netlify (Free)
1. Drag and drop the `portfolio` folder onto [Netlify Drop](https://app.netlify.com/drop).
2. Your website goes live immediately with a free HTTPS custom domain.

---

## ✨ Features & Architecture Highlights

- **Visual Identity:** Premium electric-blue (`#2979FF`, `#00C8FF`) on near-black (`#080B12`, `#101522`) theme.
- **Theme Toggle:** Persistent Dark/Light mode toggle with `localStorage` storage and accessible contrast.
- **No Avatar / Photo Required:** Custom inline SVG data pipelines, data flow diagrams, and architectural charts instead of generic placeholders.
- **Project Filtering:** Dynamic category filters (`All`, `Data Engineering`, `Data Analytics & Prep`, `Collaborative & AI Innovation`) powered by clean Vanilla JavaScript.
- **In-Progress Flagging:** Transparent representation of ongoing projects (Snowflake & dbt pipeline) without fabricating credentials or URLs.
- **Honest Static Workflow:** Form validation with direct client-side mailto dispatch to `leqaawaleed26@gmail.com` with pre-filled subject and body.
- **Accessibility:** Semantic HTML5 elements, `:focus-visible` indicators, skip-to-content link, screen reader ARIA labels, and `prefers-reduced-motion` compliance.
