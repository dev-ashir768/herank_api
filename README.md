# HeRank Backend API

This is a modern Node.js backend application built with **Express.js (v5)**, **TypeScript**, and **Prisma ORM** for PostgreSQL. It provides a highly scalable, secure, and type-safe foundation for building enterprise-grade backend services.

## 🚀 Tech Stack

- **Backend Framework:** Express.js (v5)
- **Language:** TypeScript
- **Database ORM:** Prisma
- **Database:** PostgreSQL (`@prisma/adapter-pg` & `pg`)
- **Validation:** Zod
- **Authentication:** JSON Web Tokens (Access Tokens & Refresh Tokens) & bcryptjs
- **Security & Utilities:** Helmet, CORS, Compression, Morgan (Logging)

---

## 📁 Project Architecture

The project strictly follows the **Controller-Service-Route** layered architecture. This separates request routing, HTTP response handling, and core business logic.

```
herank/
├── prisma/                 # Prisma ORM setup
│   ├── schema.prisma       # Database models (User & Role enum)
│   └── seed.ts             # Database seeding script (Super Admin creation)
├── src/                    # Main source code directory
│   ├── config/             # Environment variables validation & DB connection
│   ├── controllers/        # Request/Response HTTP handlers
│   ├── middlewares/        # Custom Express middlewares (Auth, Validation, Error Handling)
│   ├── routes/             # API routing configurations
│   ├── schemas/            # Zod validation schemas for requests
│   ├── services/           # Core business logic / Database operations
│   ├── types/              # Global TypeScript interfaces and payloads
│   ├── utils/              # Helper functions (JWT generation/verification, Hashing)
│   ├── app.ts              # Express application setup and middlewares
│   └── server.ts           # Entry point that starts the server
└── package.json            # Scripts & Dependencies
```

---

## 🛡️ Authentication Flow & Security

The application implements a robust authentication system using **Short-lived Access Tokens** and **Long-lived Refresh Tokens**.

### 1. Registration (`POST /api/v1/auth/signup`)

- Protected by `authMiddleware.protect(["SUPER_ADMIN", "ADMIN"])`.
- Only authorized Admins can create new user accounts.
- Passwords are encrypted using `bcryptjs` before hitting the database.

### 2. Login (`POST /api/v1/auth/login`)

- Authenticates the user credentials.
- Returns a `15-minute` **Access Token** (for accessing protected routes) and a `7-day` **Refresh Token** (for renewing sessions).
- The Refresh Token is securely stored in the database under the User record.

### 3. Refresh Token (`POST /api/v1/auth/refresh`)

- Used when the Access Token expires (`401 Unauthorized`).
- Client sends the Refresh Token. The server verifies it against the secret and checks if it matches the one stored in the DB.
- Returns a brand new Access Token and rotates the Refresh Token for enhanced security.

---

## 🔄 Request Workflow (How it works)

1. **Client Request:** The user hits an API endpoint (e.g., `POST /api/v1/auth/login`).
2. **Global Middlewares:** The request passes through `cors`, `helmet`, `express.json()`, and `morgan` (in `app.ts`).
3. **Router:** The route maps the request to its corresponding middleware and controller (`src/routes`).
4. **Validation:** The request payload is parsed and validated by **Zod** (`validate.middleware.ts`). If invalid, a `400 Bad Request` is returned automatically.
5. **Controller:** The controller (`auth.controller.ts`) extracts the `req.body` and passes it to the Service layer.
6. **Service:** The service (`auth.service.ts`) executes the business logic (e.g., Prisma DB calls, password hashing).
7. **Response:** The service returns the payload to the controller, which formats it using a standard `ApiResponse` type and sends it back to the client.
8. **Error Handling:** Any error thrown in the service is automatically caught by `asyncHandler` and passed to the **Global Error Handler** (`error.middleware.ts`) to return a standardized JSON error.

---

## 🛠️ Setup and Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/herank?schema=public"

# JWT Secrets
JWT_ACCESS_SECRET="your_super_secret_access_key"
JWT_REFRESH_SECRET="your_super_secret_refresh_key"

# Database Seeding Variables
SUPER_ADMIN_EMAIL="superadmin@gmail.com"
SUPER_ADMIN_PASSWORD="Admin@12345678"
```

_(Note: Application will not start if any of these variables are missing, thanks to Zod environment validation in `src/config/index.ts`)_

### 3. Database Setup (Prisma)

Run the following commands to generate the Prisma Client and push your schema to the Postgres database:

```bash
npm run db:generate
npm run db:push
```

### 4. Database Seeding (Optional)

To create the foundational **Super Admin** account, run the seed script:

```bash
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

---

## 📝 Available Scripts (`package.json`)

- `npm run dev` - Starts the development server using `tsx` with watch mode.
- `npm run build` - Compiles TypeScript to JavaScript using `tsc`.
- `npm start` - Runs the compiled production build from the `dist` folder.
- `npm run db:generate` - Generates the Prisma Client.
- `npm run db:push` - Synchronizes Prisma schema with the database directly.
- `npm run db:migrate` - Creates a database migration (used for production changes).
- `npm run db:studio` - Opens Prisma Studio locally to view and edit database records.
- `npm run db:seed` - Executes `prisma/seed.ts` to populate foundational data.
