import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";

export const permissionMiddleware = {
  checkPermission:
    (resource: string, action: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (userRole === "SUPER_ADMIN") {
        return next();
      }

      const permission = await prisma.permission.findFirst({
        where: {
          userId,
          resource,
          action,
        },
      });

      if (!permission) {
        return res.status(403).json({
          status: 0,
          message: "You do not have permission to perform this action",
          data: [],
        });
      }

      next();
    },
};
