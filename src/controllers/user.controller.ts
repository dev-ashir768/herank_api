import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { userService } from "../services/user.service";
import { ApiRes } from "../utils/apiResponse.util";
import { ApiResponse } from "../types";
import { UpdateUserInput } from "../schemas/user.schema";

export const userController = {
  getUserById: asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const { userId } = req.params;
    const user = await userService.getUserById(Number(userId));

    if (!user) {
      throw new Error("User not found");
    }

    ApiRes.success(res, "User details fetched successfully", user, 200);
  }),

  updateUserById: asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const body = req.body as UpdateUserInput;
    const user = await userService.updateUserById(body);

    if (!user) {
      throw new Error("User not found");
    }

    ApiRes.success(res, "User details updated successfully", user, 200);
  }),
};
