# ✨ Stunning AI First

Generative website concept playground: submit a product/startup idea → receive a stylized 3‑section website (Hero + 2 smartly selected themed sections) rendered with bold, animated Tailwind-driven visual themes. Built as a clean, hackable full‑stack baseline (NestJS + MongoDB + Next.js) with Docker Compose.

## 🚀 Highlights

- Deterministic theme mapping with an expanded palette (sleek-dark, clean-light, gradient-pop, muted-elegant, neon-mesh, ocean-glass, sunset-glow, forest-aura)
- Exactly 3 sections per generated site (Hero + 2 distinct contextual sections)
- Rich section taxonomy (Features, Benefits, How It Works, Testimonials, Use Cases, Pricing, FAQ, Call To Action, Metrics, Integrations, Security, Roadmap, Case Studies, Onboarding, Customization, Sustainability)
- Creative visual systems: gradient overlays, mesh / grid / dots patterns, animated atmospheric layers, subtle motion (float-slow, drift)
- Dark / light mode toggle (scoped to websites area) with persistent preference
- Safe destructive actions: single delete + bulk delete with explicit confirmation header + typed UI confirmation

## 🧱 Tech Stack

| Layer | Tech |
|-------|------|
| Backend API | NestJS 10 + Mongoose |
| Database | MongoDB 6 (container) |
| Frontend | Next.js 14 (Pages Router) + React 18 |
| Styling | Tailwind CSS + custom animations / gradients |
| Orchestration | Docker Compose |

## 📁 Project Structure

```text
backend/            NestJS service (API + generation logic)
frontend/           Next.js app (UI + theming + rendering)
docker-compose.yml  Multi-service local orchestration
```

## ⚙️ Environment

Copy example env files if running outside compose:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
```
(Examples currently minimal; extend with real AI keys later.)

## 🐳 Quick Start (Docker)

Prereqs: Docker Desktop (or engine) + Docker Compose plugin.

```powershell
docker compose up --build
```

Services:
- Frontend: <http://localhost:3000>
- Backend:  <http://localhost:3001>
- Mongo:    <mongodb://localhost:27017>

Stop & remove: `docker compose down` (add `-v` to clear volumes).

## 🧪 Local Dev (no Docker)

Terminal 1 (Mongo – simplest via container):

```powershell
docker run --name stunning-mongo -p 27017:27017 -d mongo:6
```
Backend:
```powershell
cd backend
npm install
npm run start:dev
```
Frontend (new shell):
```powershell
cd frontend
npm install
npm run dev
```

## 🔌 API Summary
Base URL: `http://localhost:3001`

| Method | Endpoint        | Purpose |
|--------|-----------------|---------|
| POST   | /websites       | Generate a new 3‑section site document |
| GET    | /websites       | List all generated sites (most recent first) |
| GET    | /websites/:id   | Get single site by id |
| DELETE | /websites/:id   | Delete one site |
| DELETE | /websites       | Bulk delete (requires header) |

### POST /websites
Request:
```json
{ "idea": "AI travel planner" }
```
Response (abridged example):
```json
{
  "_id": "665f...",
  "idea": "AI travel planner",
  "sections": [
    { "title": "Hero", "content": "...", "order": 0 },
    { "title": "Metrics", "content": "...", "order": 1 },
    { "title": "Security", "content": "...", "order": 2 }
  ],
  "createdAt": "2025-08-09T18:25:06.000Z"
}
```

### Bulk Delete Safeguard
`DELETE /websites` must include header: `x-confirm-delete-all: YES` (UI also forces typed confirmation).

## 🎨 Theming & Rendering
- Theme chosen deterministically from idea/id hash + mode
- Hero always first; 2 additional distinct section types selected from the rich pool
- Pattern & atmospheric layers vary by index for visual rhythm
- Light/dark mode stored in localStorage (scoped toggle only on `/websites` pages)

## 🔐 Data Model (simplified)
```ts
Website {
  _id: ObjectId
  idea: string
  sections: { title: string; content: string; order: number }[]  // length = 3
  createdAt: Date
}
```

## 🗑️ Deletion Flow
Single delete: Immediate removal.
Bulk delete: Modal → user types keyword → request sends special header → backend verifies.

## 🧭 Frontend UX Flow
1. Landing page: submit idea
2. Redirect to websites list (or detail) once created
3. View generated sections with animated visual treatments
4. Optional deletes

## 🛠️ Scripts
Backend:
- `npm run build` → TypeScript compile to `dist/`
- `npm run start:dev` → ts-node-dev with live reload
Frontend:
- `npm run dev` → Next.js dev server
- `npm run build` / `npm start` → production build & run

## 📦 Docker Notes
- Backend runs in dev mode in compose for rapid iteration; switch to `npm start` in compose for production-like runtime
- Add healthchecks (future improvement) for readiness gates

## 🧭 Roadmap Ideas
- Regenerate button on detail page
- Theme picker / manual override
- Real AI content (OpenAI, Anthropic, etc.)
- Auth & per-user segregation
- Pagination & search on sites list
- Editable sections & reordering
- Automated tests (unit + e2e)

## 🧪 Testing (Planned)
Currently minimal. Suggested next steps:
- Jest + supertest for backend endpoints
- Playwright or Cypress for create/list/delete flow

## 🧯 Operational Considerations
- No auth → DO NOT expose publicly as-is
- Bulk delete guard reduces accidental data loss but not malicious use
- Consider rate limiting if deployed

## 🤝 Contributing
1. Fork & clone
2. Create branch: `feat/your-feature`
3. Commit following Conventional Commits (e.g., `feat: add regeneration endpoint`)
4. PR with summary + before/after screenshots (for UI changes)

## ☁️ Deploying
Minimal path:
1. Build images: `docker compose build`
2. Push to registry (tag appropriately)
3. Provision managed Mongo (or run container volume)
4. Use a reverse proxy (Traefik / Nginx) for TLS + domain routing

## 🔍 Troubleshooting
| Symptom | Fix |
|---------|-----|
| Frontend 404 to API | Verify backend container running & port 3001 mapped |
| Mongo connection error | Ensure service `mongo` healthy; port not already bound |
| Styles missing | Confirm Tailwind compiled (restart dev server) |
| Bulk delete fails | Missing header `x-confirm-delete-all: YES` |

## 📹 Loom Walkthrough Script (Condensed)
1. Show repo layout
2. `docker compose up --build`
3. Submit idea -> show network tab (POST + GET)
4. List view -> open detail
5. Demonstrate delete + bulk delete safeguard
6. Briefly explain how to plug real AI

## 📝 License
MIT (add a LICENSE file if distributing externally)

---
Happy building & experimenting with generative UI ✨
