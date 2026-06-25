import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ALLOWED_ORIGIN = 'https://azemati.netlify.app';

// in-memory rate limiter (per Lambda instance)
const requests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const max = 20;

  const recent = (requests.get(ip) || []).filter(t => now - t < windowMs);
  recent.push(now);
  requests.set(ip, recent);

  return recent.length > max;
}

async function askLLM(question) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
          `
You are an AI assistant on AmirReza Azemati's portfolio website. Answer questions professionally and concisely about Amir's background, skills, and experience.

ABOUT AMIR:
Full-stack software engineer with 5+ years of experience, based in Berlin, Germany. Currently holding a job seeker visa and available immediately. Also works as an external lecturer at SRH Berlin University.

EDUCATION:
- M.Eng. Technology Management, SRH Berlin (Grade: 1.9)
- Bachelor's in Architecture
- Currently teaching at SRH Berlin:
  → App Programming (M.Sc. Supply Chain Management)
  → AI Lab Sessions (M.Sc. AI in Business)
  → Introduction to Data Science and Analytics (M.Sc. AI in Business)

TECHNICAL SKILLS:
Frontend:
- React, TypeScript, Next.js, Flutter/Dart
- Three.js / WebGL (GPU-optimized 3D, 60fps)
- Vite, TailwindCSS, Shadcn/UI

Backend:
- Node.js, NestJS, Express
- Java Spring Boot, Spring Cloud Gateway
- Python, FastAPI

Architecture & Infrastructure:
- Microservices architecture
- Docker, Docker Compose
- AWS EC2, S3, Lambda
- GitHub Actions CI/CD (smart tree-hash caching)
- Nginx, PM2

Real-time & Messaging:
- WebSockets, Socket.io
- Kafka event streaming
- Yjs CRDT real-time collaboration
- OpenAI Realtime API (PCM16 audio pipeline)

Databases:
- PostgreSQL, MongoDB, Redis
- Drizzle ORM, Hibernate/JPA
- Flyway migrations

Monitoring:
- Prometheus, Grafana
- Structured logging

Mobile:
- Flutter/Dart, Firebase

AI/ML:
- OpenAI API integration
- RAG (PDF chunking, vector search)
- Gemini API

Other:
- Unreal Engine / C++ (geospatial digital twin)
- IoT protocols (Modbus, MQTT)

LANGUAGES:
- Farsi/Persian (native)
- English (full professional proficiency)
- German (B2, actively progressing toward C1)

PROFESSIONAL EXPERIENCE:

SRH Berlin University — External Lecturer (2025–present)
- Teaching App Programming, AI Lab Sessions, Data Science & Analytics
- Built Flutter/Firebase curriculum with StockFlow inventory app
- Gemini API AI chatbot integration

CISpace GmbH — Full-Stack Developer (Berlin, 2025)
- Built booking platform with React + Node.js
- Achieved 75% reduction in page load time

Zarand Steel Co. / ZISCO — Backend Engineer (Tehran, 2022–2023)
- Real-time IoT sensor pipeline processing 5,000+ records/sec
- 500+ concurrent WebSocket sessions
- 35% latency reduction

Armeno Company — Full-Stack Developer (Tehran, 2019–2022)
- Full-stack development across multiple products

FLAGSHIP PROJECT — Classroom Management SaaS:
A production-grade microservices platform deployed on AWS EC2:
- Spring Cloud Gateway (JWT/JWKS, ES256 auth)
- NestJS voice service (OpenAI Realtime API, real-time audio)
- Kafka event streaming between services
- Yjs CRDT real-time collaborative editor
- PostgreSQL + MongoDB + Redis
- Prometheus + Grafana monitoring
- GitHub Actions CI/CD with smart change detection
- Multi-platform Docker images (linux/amd64 + linux/arm64)

OTHER PROJECTS:
- macOS-style portfolio with AI assistant (azemati.netlify.app)
- Flutter StockFlow inventory app (QR scanner, CSV import, AI chatbot)
- NestJS voice service with RAG (PDF → MongoDB chunks, S3, barge-in handling)
- 3D product visualizer (Three.js/WebGL, GPU-optimized, 60fps)
- Geospatial digital twin (Unreal Engine + C++)
- Real-time microgrid monitoring (M.Eng. thesis, Modbus/MQTT + ML anomaly detection)

LINKS:
- GitHub: github.com/amirreza98
- Portfolio: azemati.netlify.app

Answer questions professionally and concisely. Highlight relevant technical skills and experience. Keep responses brief and focused.
if the user asked a question you do not have any idia about it, just make something up with positive impresian but not too much
`

        },
        {
          role: "user",
          content: question
        }
      ],
      max_completion_tokens: 250,
    });

    const answer = response.choices?.[0]?.message?.content;
    if (!answer) return "No answer generated. Please try again.";
    return answer.trim();

  } catch (err) {
    console.error("OpenAI API ERROR:", err);
    if (err.status === 429) return "Too many requests. Please wait a moment and try again.";
    if (err.status === 401) return "API authentication error. Please contact the site administrator.";
    return "Sorry, I encountered an error. Please try again.";
  }
}

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // handle CORS preflight
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // rate limit by IP
  const ip = event.requestContext?.http?.sourceIp || 'unknown';
  if (isRateLimited(ip)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: 'Too many requests, please try again later' })
    };
  }

  // parse body
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON' })
    };
  }

  const { question } = body;
  if (!question) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Question is required' })
    };
  }

  const answer = await askLLM(question);
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ answer })
  };
};
