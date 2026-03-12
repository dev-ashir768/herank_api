import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { userService } from "../services/user.service";
import { ApiRes } from "../utils/apiResponse.util";
import { ApiResponse } from "../types";
import {
  UpdateUserInput,
  GetAllUsersInput,
  CreateUserInput,
} from "../schemas/user.schema";

export const userController = {
  getAllUsers: asyncHandler(
    async (req: Request, res: Response<ApiResponse>) => {
      const query = req.query as unknown as GetAllUsersInput;
      const page = query?.page ? Number(query.page) : 1;
      const limit = query?.limit ? Number(query.limit) : 10;

      const result = await userService.getAllUsers(page, limit);
      ApiRes.success(res, "Users fetched successfully", result, 200);
    },
  ),

  createUser: asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const body = req.body as CreateUserInput;
    const user = await userService.createUser(body);
    ApiRes.success(res, "User created successfully", user, 201);
  }),

  deleteUserById: asyncHandler(
    async (req: Request, res: Response<ApiResponse>) => {
      const { userId } = req.params;
      await userService.deleteUserById(Number(userId));
      ApiRes.success(res, "User deleted successfully", null, 200);
    },
  ),

  getUserById: asyncHandler(
    async (req: Request, res: Response<ApiResponse>) => {
      const { userId } = req.params;
      const user = await userService.getUserById(Number(userId));

      if (!user) {
        throw new Error("User not found");
      }

      ApiRes.success(res, "User details fetched successfully", user, 200);
    },
  ),

  updateUserById: asyncHandler(
    async (req: Request, res: Response<ApiResponse>) => {
      const body = req.body as UpdateUserInput;
      const user = await userService.updateUserById(body);

      if (!user) {
        throw new Error("User not found");
      }

      ApiRes.success(res, "User details updated successfully", user, 200);
    },
  ),
};
