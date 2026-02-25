import express, { Application, Response } from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { healthController } from "./controllers/health.controller";
import { config } from "./config";
import { ApiRes } from "./utils/apiResponse.util";
import { morganStream } from "./utils/logger.util";

// Import routes
import authRoutes from "./routes/auth.routes";
import { ApiResponse } from "./types";
import menuRoutes from "./routes/menu.routes";
import userRoutes from "./routes/user.routes";

const app: Application = express();
// Middlewares
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(
  compression({
    level: 6,
    threshold: 100 * 1024,
  }),
);

if (config.NODE_ENV === "development") {
  app.use(morgan("dev", { stream: morganStream }));
} else {
  app.use(morgan("combined", { stream: morganStream }));
}

// Rate Limiting
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX,
  message: "Too many requests, please try again later.",
});

// Routes
app.get("/health", healthController.healthCheck);
app.use("/api", limiter);
app.use(`${config.API_PREFIX}/auth`, authRoutes);
app.use(`${config.API_PREFIX}/menus`, menuRoutes);
app.use(`${config.API_PREFIX}/users`, userRoutes);

// Catch-all 404 Handler for Unknown Routes
app.use((req, res: Response<ApiResponse>, _next) => {
  ApiRes.error(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
});

app.use(errorMiddleware.errorHandler);

export default app;
