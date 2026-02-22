import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";
import { JWTAccessTokenResponse } from "../types";
import { verifyAccessToken } from "../utils/jwt.util";

export const authMiddleware = {
  protect:
    (roles: string[]) =>
    (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          status: 0,
          message: "Unauthorized",
          data: [],
        });
      }

      try {
        const decoded = verifyAccessToken(token) as JWTAccessTokenResponse;

        if (!roles.includes(decoded.role)) {
          return res.status(403).json({
            status: 0,
            message: "You do not have permission to perform this action",
            data: [],
          });
        }

        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json({
          status: 0,
          message: "Invalid token",
          data: [],
        });
      }
    },
};
