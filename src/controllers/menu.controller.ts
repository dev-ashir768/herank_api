import { Request, Response } from "express";
import { menuService } from "../services/menu.service";
import { ApiRes } from "../utils/apiResponse.util";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../types";
import { CreateMenuInput, UpdateMenuInput } from "../schemas/menu.schema";

export const menuController = {
  getAllMenus: asyncHandler(
    async (_req: Request, res: Response<ApiResponse>) => {
      const menus = await menuService.getAllMenus();
      ApiRes.success(res, "Menus fetched successfully", menus);
    },
  ),

  getMenuById: asyncHandler(
    async (req: Request, res: Response<ApiResponse>) => {
      const { menuId } = req.params;
      const menu = await menuService.getMenuById(Number(menuId));
      if (!menu) {
        throw new Error("Menu not found");
      }
      ApiRes.success(res, "Menu fetched successfully", menu);
    },
  ),

  createMenu: asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const body = req.body as CreateMenuInput;
    const menu = await menuService.createMenu(body);
    ApiRes.success(res, "Menu created successfully", menu, 201);
  }),

  updateMenu: asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const { menuId } = req.params;
    const body = req.body as UpdateMenuInput;
    const menu = await menuService.updateMenu(Number(menuId), body);
    ApiRes.success(res, "Menu updated successfully", menu);
  }),

  deleteMenu: asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const { menuId } = req.params;
    await menuService.deleteMenu(Number(menuId));
    ApiRes.success(res, "Menu deleted successfully", null);
  }),
};
