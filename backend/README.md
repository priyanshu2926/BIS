# BIS AI Assistant — Backend API (Phase 0 Foundation)

Backend service for the **SIH Project: AI-powered Intelligent Assistant for Indian Standards and BIS Services for Industries and Consumers**.

> **Note on Phase 0**: This is strictly the **Backend Foundation** phase. It establishes a clean REST API architecture, Express configuration, environment management, CORS, security middleware, and centralized error handling. AI/RAG models, vector databases, web scrapers, and database schemas will be integrated in subsequent phases.

---

## 1. Technologies Used

* **Runtime**: [Node.js](https://nodejs.org/) (v18+)
* **Framework**: [Express.js](https://expressjs.com/) (v4.x)
* **Module System**: ES Modules (`"type": "module"`)
* **Security & Utility Middleware**:
  * `helmet` — Security headers
  * `cors` — Configurable Cross-Origin Resource Sharing
  * `morgan` — HTTP request logger
  * `dotenv` — Environment variable management
* **Development**:
  * `nodemon` — Automatic server reloading

---

## 2. Directory Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── env.js                 # Environment variable validation & loader
│   ├── controllers/
│   │   └── healthController.js    # Health check & status controller
│   ├── middleware/
│   │   ├── errorMiddleware.js     # Centralized error handling
│   │   └── notFoundMiddleware.js  # 404 Route Not Found handler
│   ├── routes/
│   │   ├── index.js               # Central API v1 router (/api/v1)
│   │   └── healthRoutes.js        # Health check route definitions
│   ├── services/                  # Business logic (for future phases)
│   ├── utils/                     # Utility helpers (for future phases)
│   ├── app.js                     # Express app configuration & middleware pipeline
│   └── server.js                  # HTTP server entry point & lifecycle management
├── .env                           # Local environment file (git-ignored)
├── .env.example                   # Template environment variables
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies & npm scripts
└── README.md                      # Backend documentation
```

---

## 3. Installation & Setup

### Prerequisites
* Node.js (v18.0.0 or higher recommended)
* npm (v9.0.0 or higher)

### Step 1: Navigate to backend directory
```bash
cd backend
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Default `.env` configuration:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## 4. Running the Server

### Development Mode (with hot-reload via Nodemon)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

---

## 5. API Endpoints

All API endpoints are versioned under `/api/v1/`.

### Health Check
* **Route**: `GET /api/v1/health`
* **Description**: Verifies API availability, environment, and dynamic timestamp.
* **Access**: Public
* **Response (200 OK)**:
```json
{
  "success": true,
  "message": "BIS Assistant API is running",
  "environment": "development",
  "timestamp": "2026-08-24T19:30:00.000Z"
}
```

### 404 Handling (Unknown Route)
* **Route**: `GET /api/v1/test` (or any unregistered route)
* **Response (404 Not Found)**:
```json
{
  "success": false,
  "message": "Route not found: GET /api/v1/test"
}
```

---

## 6. Architecture & Frontend Compatibility

The frontend communicates with this backend via its modular service layer (`src/services/api/`).

When future phases are implemented, API endpoints will be registered under the central router `src/routes/index.js`:

| Module | Route Prefix | Description |
| :--- | :--- | :--- |
| **Health** | `/api/v1/health` | Service health status *(Implemented in Phase 0)* |
| **Standards** | `/api/v1/standards` | Indian Standards search & clauses |
| **Assistant** | `/api/v1/assistant` | AI / RAG conversational guidance |
| **Certification** | `/api/v1/certification` | Scheme-I (ISI Mark) roadmap & checks |
| **Compliance** | `/api/v1/compliance` | Project checklists & progress |
| **Testing** | `/api/v1/testing` | Test requirements & laboratory search |
| **Documents** | `/api/v1/documents` | Document upload, OCR, & chunking |
| **Products** | `/api/v1/products` | Consumer product specifications |
| **Complaints** | `/api/v1/complaints` | Consumer grievance guidance |

---

## 7. Upcoming Backend Phases

1. **Phase 1 — Database & Standards Indexing**: MongoDB / PostgreSQL schema setup and official BIS standards ingestion.
2. **Phase 2 — Vector Search & RAG Foundation**: Embedding generation and vector database indexing for BIS gazette clauses.
3. **Phase 3 — AI Assistant & Citation Engine**: Integration of LLM reasoning pipeline with source-backed citations.
4. **Phase 4 — Certification, Compliance & Lab Testing APIs**: Business logic services for manufacturer guidance.
5. **Phase 5 — Document Intelligence**: OCR parsing, PDF text extraction, and automated clause matching.
