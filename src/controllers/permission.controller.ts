import { Request, Response } from "express";
import { permissionService } from "../services/permission.service";
import { ApiRes } from "../utils/apiResponse.util";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../types";
import {
  CreatePermissionInput,
  UpdatePermissionInput,
  GetAllPermissionsInput,
} from "../schemas/permission.schema";

export const permissionController = {
  getAllPermissions: asyncHandler(
    async (req: Request, res: Response<ApiResponse>) => {
      const query = req.query as GetAllPermissionsInput;
      const userId = query?.userId ? Number(query.userId) : undefined;
      const menuId = query?.menuId ? Number(query.menuId) : undefined;

      const permissions = await permissionService.getAllPermissions(
        userId,
        menuId,
      );
      ApiRes.success(res, "Permissions fetched successfully", permissions);
    },
  ),

  getPermissionById: asyncHandler(
    async (req: Request, res: Response<ApiResponse>) => {
      const { permissionId } = req.params;
      const permission = await permissionService.getPermissionById(
        Number(permissionId),
      );

      if (!permission) {
        throw new Error("Permission not found");
      }

      ApiRes.success(res, "Permission fetched successfully", permission);
    },
  ),

  createPermission: asyncHandler(
    async (req: Request, res: Response<ApiResponse>) => {
      const body = req.body as CreatePermissionInput;
      const permission = await permissionService.createPermission(body);
      ApiRes.success(res, "Permission created successfully", permission, 201);
    },
  ),

  updatePermission: asyncHandler(
    async (req: Request, res: Response<ApiResponse>) => {
      const { permissionId } = req.params;
      const body = req.body as UpdatePermissionInput;
      const permission = await permissionService.updatePermission(
        Number(permissionId),
        body,
      );
      ApiRes.success(res, "Permission updated successfully", permission);
    },
  ),

  deletePermission: asyncHandler(
    async (req: Request, res: Response<ApiResponse>) => {
      const { permissionId } = req.params;
      await permissionService.deletePermission(Number(permissionId));
      ApiRes.success(res, "Permission deleted successfully", null);
    },
  ),
};
