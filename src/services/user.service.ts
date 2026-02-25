import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../config/db";
import { UpdateUserInput } from "../schemas/user.schema";
import { UserByIdResponse } from "../types";
import { hashPassword } from "../utils/password.util";

export const userService = {
  getUserById: async (userId: number): Promise<UserByIdResponse | null> => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
        permissions: {
          select: {
            menuId: true,
            canView: true,
            canCreate: true,
            canUpdate: true,
            canDelete: true,
            menu: {
              select: {
                title: true,
                icon: true,
                url: true,
                parentId: true,
              },
            },
          },
        },
      },
    });
    return user;
  },

  updateUserById: async (
    data: UpdateUserInput,
  ): Promise<UserByIdResponse | null> => {
    const { updateMode, permissions, userId, ...otherData } = data;

    const updateData: Prisma.UserUpdateInput = {
      email: otherData.email,
      role: otherData.role,
    };

    if (data.updateMode === "REPLACE") {
      updateData.permissions = {
        deleteMany: {},
        create: permissions.map((p) => ({ ...p })),
      };
    } else {
      updateData.permissions = {
        upsert: permissions.map((p) => ({
          where: { userId_menuId: { userId, menuId: p.menuId } },
          update: { ...p },
          create: { ...p },
        })),
      };
    }

    if (data.password) {
      updateData.password = await hashPassword(data.password);
    }

    const user = await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: updateData,
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
        permissions: {
          select: {
            menuId: true,
            canView: true,
            canCreate: true,
            canUpdate: true,
            canDelete: true,
            menu: {
              select: {
                title: true,
                icon: true,
                url: true,
                parentId: true,
              },
            },
          },
        },
      },
    });
    return user as UserByIdResponse;
  },
};
