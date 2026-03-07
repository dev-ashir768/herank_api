import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../config/db";
import { config } from "../config";
import { ApiResponse } from "../types";

export const healthController = {
  healthCheck: asyncHandler(
    async (_req: Request, res: Response<ApiResponse>) => {
      const dbCheck = await prisma.$queryRaw<
        { result: number }[]
      >`SELECT 1 as result`;

      const healthData = {
        status: "UP",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        db_status: dbCheck ? "CONNECTED" : "DISCONNECTED",
        environment:
          config.NODE_ENV === "development" ? "Development" : "Production",
      };

      res.status(200).json({
        status: 1,
        message: "Server is running...",
        data: [healthData],
      });
    },
  ),
};
