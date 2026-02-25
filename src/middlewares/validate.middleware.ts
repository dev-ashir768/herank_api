import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { ApiResponse } from "../types";

export const validate =
  (schema: ZodType) =>
  async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 0,
          message: `${error.issues.map((issue) => issue.message).join(", ")}`,
          data: [],
        });
      }

      next(error);
    }
  };
