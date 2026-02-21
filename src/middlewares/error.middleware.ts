import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.util";
import { config } from "../config";

export const errorMiddleware = {
  errorHandler: (
    err: Error,
    _req: Request,
    res: Response<any>,
    _next: NextFunction,
  ) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Log the error using Winston
    logger.error(`Unhandled Error: ${err.message}`, { stack: err.stack });

    res.status(statusCode).json({
      status: 0,
      message: err.message,
      stack: config.NODE_ENV === "production" ? null : err.stack,
      data: [],
    });
  },
};
