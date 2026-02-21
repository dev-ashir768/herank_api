import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../types/response.type";
import { ApiRes } from "../utils/apiResponse.util";

export const authController = {
  signup: asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const user = await authService.createUser(req.body);
    ApiRes.success(res, "User created successfully", user, 201);
  }),
  login: asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const result = await authService.loginUser(req.body);
    ApiRes.success(res, "User logged in successfully", result);
  }),
  refresh: asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const result = await authService.refreshToken(req.body);
    ApiRes.success(res, "Token refreshed successfully", result);
  }),
};
