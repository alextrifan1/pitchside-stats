# Pitchside Stats ⚽

A full-stack web application that challenges users to identify football champions based on real-world standings data.

## Architecture

Pitchside Stats is built using a **Backend-for-Frontend (BFF)** proxy architecture:
- React client communicates exclusively with a local Express server
- Backend handles authentication, data sanitization, and API integration
- Secure separation of concerns between frontend and third-party APIs

## Features

- **Secure Authentication:** JWT-based, bcrypt password hashing, Zod request validation
- **Protected Routes:** Redux Toolkit manages auth state with defensive routing
- **Dynamic Quiz Engine:** Real-time sanitization and randomization of standings data
- **Type Safety:** Full TypeScript across backend and frontend

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, TypeScript, Redux Toolkit, Tailwind CSS, Vite |
| **Backend** | Node.js, Express, TypeScript, MongoDB, Zod |
| **Infrastructure** | Docker & Docker Compose |
| **Data** | API-Football (v3) |

## Prerequisites

- **Docker & Docker Compose** (recommended), OR
- **Node.js 18+** with pnpm (local development)
- **MongoDB** (local development only; included with Docker)

## Quick Start

### With Docker (Recommended)

```bash
# Clone and navigate
git clone https://github.com/yourusername/pitchside-stats.git
cd pitchside-stats
```

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/pitchside
JWT_SECRET=your_jwt_secret_here
API_FOOTBALL_KEY=your_api_sports_key
```

```bash
# Start services
docker compose up --build

# Access application
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```

### Local Development

```bash
# Backend setup
cd backend
pnpm install
echo "PORT=5000
MONGO_URI=mongodb://localhost:27017/pitchside
JWT_SECRET=dev_secret_key
API_FOOTBALL_KEY=your_api_sports_key" > .env

# Start MongoDB separately, then:
pnpm dev

# Frontend setup (in new terminal)
cd frontend
pnpm install
pnpm dev
```

## Environment Variables Reference

| Variable | Source | Notes |
|----------|--------|-------|
| `PORT` | Backend port | Default: 5000 |
| `API_FOOTBALL_KEY` | [API-Football](https://www.api-football.com/) | Free tier available; requires account |
| `JWT_SECRET` | Generate locally | Use `openssl rand -base64 32` or any 32+ char string |
| `MONGO_URI` | Your MongoDB instance | Docker: `mongodb://mongo:27017/pitchside` |
| `VITE_PORT` | Frontend port | Default: 5173; set in `frontend/.env` |

## Project Structure

```
pitchside-stats/
├── backend/
│   ├── src/
│   │   ├── app.ts              # Express app setup
│   │   ├── server.ts           # Server entry point
│   │   ├── controllers/        # Route handlers
│   │   ├── middlewares/        # Auth & validation middleware
│   │   ├── repositories/       # Data access layer
│   │   ├── routes/             # API route definitions
│   │   ├── schemas/            # Zod validation schemas
│   │   ├── services/           # Business logic
│   │   └── entities/           # Data models
│   ├── .env                    # Environment variables (git-ignored)
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx             # Root component
│   │   ├── api/                # API client
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   └── store/              # Redux state management
│   ├── package.json
│   └── vite.config.ts
└── docker-compose.yml
```

## Roadmap / TODO

### Quiz Modes
- [ ] **Top Scorers Quiz** - "Who was the top scorer in [League] 2022?"
- [ ] **Stadium/Founded Year Trivia** - "This champion team plays at [stadium]" or "Founded in [year]"
- [ ] **Logo Recognition** - Show team logo, guess the 2022 champion 

### User Features
- [ ] **Quiz History** - Store attempts and results per user

### Performance & Data
- [ ] **API Response Caching** - Redis cache for standings/leagues (reduce API hits, improve load time)
- [ ] **Batch API Requests** - Fetch multiple leagues/seasons efficiently
- [ ] **Rate Limiting** - Respect API-Football free tier limits

### UI/UX
- [ ] **Quiz Selection Screen** - Choose quiz mode before playing
- [ ] **Results Breakdown** - Show correct answer, user answer, streak tracker

**Note:** Free tier API-Football limited to 2022 data; all features currently target this dataset.


