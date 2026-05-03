# 🗳️ Election Assistant

> An interactive civic education platform that demystifies India's democratic process — complete with a voting guide, timeline explorer, polling booth simulator, and an AI-powered election guide.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-election--assistant--psi.vercel.app-blue?style=flat-square)](https://election-assistant-psi.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-96%25-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com)

---

## ✨ Features

| Feature | Description |
|---|---|
| 📋 **Personal Voting Guide** | Step-by-step readiness assessment with a personalized checklist and readiness score |
| ⏱️ **Election Timeline** | Interactive journey from announcement → nomination → campaign → voting → counting → declaration |
| 🗳️ **Booth Simulator** | Walk through the exact polling booth experience — verification, ink marking, EVM voting, and VVPAT confirmation |
| 🤖 **AI Election Guide** | Ask any question to an AI assistant powered by the Anthropic API |
| 📍 **Polling Booth Finder** | Enter your location or pincode to find the nearest polling station on an interactive Leaflet map |
| 📡 **Live Election Feed** | Real-time updates with AI-powered civic explanations |
| 🧠 **Knowledge Quiz** | Test your understanding of the Indian election process |
| 📠 **EVM Explainer** | Swipeable cards explaining EVMs, VVPAT, and election technology |

---

## 🛠 Tech Stack

- **Framework** — [Next.js 15](https://nextjs.org) (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **AI** — [Anthropic API](https://anthropic.com) (Claude)
- **Maps** — Leaflet + OpenStreetMap
- **Testing** — Jest
- **Deployment** — Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- An [Anthropic API key](https://console.anthropic.com) for the AI guide

### 1. Clone the repository

```bash
git clone https://github.com/akashmishra1910/ElectionAssistant.git
cd ElectionAssistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
ElectionAssistant/
├── app/               # Next.js App Router — pages, layouts, and API routes
├── components/        # Reusable UI components (timeline, simulator, quiz, AI chat...)
├── lib/               # Utility functions, API wrappers, and shared logic
├── public/            # Static assets (images, icons)
├── __tests__/         # Jest unit tests
├── AGENTS.md          # AI agent coding guidelines
├── jest.config.ts     # Jest configuration for TypeScript
├── next.config.ts     # Next.js configuration
└── tsconfig.json      # TypeScript configuration
```

---

## 🧪 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server at `localhost:3000` |
| `npm run build` | Build the app for production |
| `npm start` | Start the production server |
| `npm test` | Run Jest unit tests |
| `npm run lint` | Lint the codebase with ESLint |

---

## ☁️ Deploy on Vercel

The easiest way to deploy is via [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import the repo on [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected
3. Add `ANTHROPIC_API_KEY` under **Settings → Environment Variables**
4. Click **Deploy** — every push to `main` auto-deploys

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 📄 License

This project is open source. Feel free to fork, learn from, and build upon it.

---

<p align="center">Built with ❤️ for Indian democracy</p>
