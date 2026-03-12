import { prisma } from "../config/db";
import {
  CreatePermissionInput,
  UpdatePermissionInput,
} from "../schemas/permission.schema";

export const permissionService = {
  getAllPermissions: async (userId?: number, menuId?: number) => {
    return await prisma.permissions.findMany({
      where: {
        ...(userId && { userId }),
        ...(menuId && { menuId }),
      },
      include: {
        user: { select: { email: true, role: true } },
        menu: { select: { title: true, icon: true } },
      },
    });
  },

  getPermissionById: async (permissionId: number) => {
    return await prisma.permissions.findUnique({
      where: { id: permissionId },
      include: {
        user: { select: { email: true, role: true } },
        menu: { select: { title: true, icon: true } },
      },
    });
  },

  createPermission: async (data: CreatePermissionInput) => {
    // Check if permission already exists for this user and menu
    const existing = await prisma.permissions.findUnique({
      where: {
        userId_menuId: {
          userId: data.userId,
          menuId: data.menuId,
        },
      },
    });

    if (existing) {
      throw new Error(
        "Permission record already exists for this user and menu",
      );
    }

    return await prisma.permissions.create({
      data,
    });
  },

  updatePermission: async (
    permissionId: number,
    data: UpdatePermissionInput,
  ) => {
    return await prisma.permissions.update({
      where: { id: permissionId },
      data,
    });
  },

  deletePermission: async (permissionId: number) => {
    return await prisma.permissions.delete({
      where: { id: permissionId },
    });
  },
};
