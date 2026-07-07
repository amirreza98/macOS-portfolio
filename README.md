# macOS Portfolio

An interactive macOS-style portfolio built with React and TypeScript. The UI mimics a desktop environment — draggable windows, a dock, a menu bar, and a fluid WebGL background — with a serverless AI assistant on the backend.

**Live:** [azemati.netlify.app](https://azemati.netlify.app)

---

## Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| Animations | GSAP (window open/close, draggable, variable-font hover) |
| Background | Three.js (custom WebGL fluid simulation) |
| State | Zustand + Immer |

### Backend
| Layer | Technology |
|---|---|
| Runtime | Node.js (ES modules) |
| Deployment | AWS Lambda (Docker container via ECR) |
| API | AWS API Gateway v2 (HTTP API) |
| AI | OpenAI GPT-4o |
| Infrastructure | Terraform (state in S3) |
| CI/CD | GitHub Actions |

---

## Features

### Window System
Every app window is an `absolute`-positioned element managed by a Zustand store that tracks `isOpen` and `zIndex`. The `WindowWrapper` HOC wraps each window component and handles:
- **Open animation** — GSAP `scale(0.5) → scale(1)` + fade-in
- **Focus pulse** — subtle scale pulse when a window is brought to front
- **Dragging** — GSAP `Draggable` bound to the `#window-header` handle
- **Z-index management** — clicking/opening always raises the window above all others

### Windows
| Window | Description |
|---|---|
| **Finder** | File explorer with sidebar navigation, back-history, and project folders. Opens `.txt`, `.pdf`, `.png`, `.fig`, and `.url` file types into their respective viewer windows. |
| **Safari** | Embedded iframe scaled to fit its container using `transform: scale()` + `ResizeObserver`, so the iframe always renders at 1280px (desktop layout) and is scaled down. |
| **AI Assistant** | Chat interface backed by a serverless GPT-4o Lambda. Capped at 3 messages per session client-side; the Lambda enforces 20 requests/hour per IP. Supports a `__warmup__` ping to pre-heat cold starts. |
| **Terminal** | Displays the full tech stack in a terminal-style layout. |
| **Resume** | PDF viewer for the resume and certificates stored in `/public/files/`. |
| **Photos** | Gallery viewer with a CSS grid layout. |
| **Contact** | Social links (GitHub, LinkedIn). |
| **Text / Image** | Generic viewers opened by Finder when clicking `.txt` or `.png` files. |

### Theme
Three modes: `light`, `dark`, `system`. System mode resolves to dark after 7pm and light otherwise, checked every minute. The resolved mode is stored in `localStorage` and applied as a `theme-light` or `theme-dark` class on `<html>`, which cascades through all CSS component styles.

### Background
A real-time fluid simulation (`LiquidEther`) built on Three.js. It runs Navier-Stokes fluid equations (advection → external force → viscosity → divergence → Poisson pressure solve → pressure projection) on the GPU via WebGL render targets. The simulation pauses when the tab is hidden (Page Visibility API) and when the canvas scrolls out of view (IntersectionObserver).

---

## Project Structure

```
macos_portfolio/
├── frontend/
│   └── src/
│       ├── App.tsx               # Root — mounts all windows + layout components
│       ├── components/           # Navbar, Dock, Welcome, LiquidBackground, etc.
│       ├── windows/              # One file per window (Finder, Safari, ChatGPT, …)
│       ├── hoc/
│       │   └── WindowWrapper.tsx # GSAP animation + drag + z-index HOC
│       ├── store/
│       │   ├── window.ts         # Open/close/focus state for all windows
│       │   ├── theme.ts          # Light/dark/system theme
│       │   └── location.ts       # Finder navigation history
│       ├── constants/
│       │   └── index.ts          # Window config, Finder file system, static data
│       └── index.css             # Global styles + per-window layout + responsive overrides
├── backend/
│   └── src/
│       └── handler.js            # Lambda handler — rate limiting, OpenAI call, CORS
└── terraform/
    ├── main.tf                   # ECR, Lambda, API Gateway, IAM
    ├── variables.tf
    └── outputs.tf
```

---

## Local Development

### Frontend

```bash
cd frontend
npm install
cp .env.example .env          # set VITE_API_URL to your Lambda endpoint
npm run dev
```

### Backend

```bash
cd backend
npm install
node test-local.mjs           # local smoke test
```

### Infrastructure

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

After `apply`, push the Docker image to the ECR repository output and deploy the Lambda.

---

## Environment Variables

| Variable | Where | Description |
|---|---|---|
| `VITE_API_URL` | frontend `.env` | Base URL of the API Gateway endpoint |
| `OPENAI_API_KEY` | Terraform `terraform.tfvars` | OpenAI API key injected into Lambda env |

---

## Deployment

- **Frontend** — Netlify (auto-deploy from `main`)
- **Backend** — GitHub Actions builds a Docker image, pushes to ECR, and forces a Lambda update on every push to `main`

[![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/amirreza98/macOS-portfolio?utm_source=oss&utm_medium=github&utm_campaign=amirreza98%2FmacOS-portfolio&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)](https://coderabbit.ai)
