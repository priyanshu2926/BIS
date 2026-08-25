# BIS AI Assistant — Backend API (Phase 1)

Backend service for the **SIH Project: AI-powered Intelligent Assistant for Indian Standards and BIS Services for Industries and Consumers**.

Phase 1 adds a PostgreSQL-backed Prisma data layer, demo seed data, pagination, search, and read APIs for the existing Industry and Consumer frontends. AI/RAG, authentication, uploads, OCR, and recommendation logic are intentionally excluded.

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
* **Database**: PostgreSQL through Prisma ORM

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

Initialize and seed the database:
```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

For the bundled local PGlite PostgreSQL-compatible server, use `npm run db:push`; Prisma `migrate dev` requires a standard PostgreSQL server connection workflow.

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

### Phase 1 resources

All list endpoints accept `page` and `limit` (default `1` and `20`, maximum `100`). Standards and products also provide `/search?q=` endpoints.

| Resource | Endpoints |
| --- | --- |
| Users | `GET /api/v1/users`, `GET /api/v1/users/:id` |
| Standards | `GET /api/v1/standards`, `/standards/:id`, `/standards/search?q=` |
| Products | `GET /api/v1/products`, `/products/:id`, `/products/search?q=` |
| Certification | `GET /api/v1/certification`, `/certification/:id` |
| Compliance | `GET /api/v1/compliance`, `/compliance/:id` |
| Testing labs | `GET /api/v1/testing/labs`, `/testing/labs/:id` |
| Documents | `GET /api/v1/documents`, `/documents/:id` |
| Complaints | `GET /api/v1/complaints`, `/complaints/:id`, `POST /api/v1/complaints` |
| Chat sessions | `GET /api/v1/chat`, `/chat/:id` (database foundation only) |

Successful list responses use `{ success, data, pagination }`; individual resources use `{ success, data }`. Complaint creation requires a non-empty `description` and accepts optional valid `userId` and `productId` values.

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

The route-to-database flow is `Route -> Controller -> Service -> Prisma -> PostgreSQL`.

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

## 7. Deliberately deferred

Future phases may add official BIS ingestion, vector search, AI chat, authentication, uploads, OCR, and advanced certification/compliance logic. They are outside Phase 1.
