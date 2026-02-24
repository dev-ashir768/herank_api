import { Request, Response } from "express";
import { menuService } from "../services/menu.service";
import { ApiRes } from "../utils/apiResponse.util";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../types";

export const menuController = {
  getAllMenus: asyncHandler(
    async (_req: Request, res: Response<ApiResponse>) => {
      const menus = await menuService.getAllMenus();
      ApiRes.success(res, "Menus fetched successfully", menus);
    },
  ),
};
