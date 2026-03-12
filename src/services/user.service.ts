import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../config/db";
import { UpdateUserInput, CreateUserInput } from "../schemas/user.schema";
import { UserByIdResponse } from "../types";
import { hashPassword } from "../utils/password.util";

export const userService = {
  getAllUsers: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.user.count(),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  createUser: async (data: CreateUserInput) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  },

  deleteUserById: async (userId: number) => {
    const user = await prisma.user.delete({
      where: { id: userId },
    });
    return user;
  },

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

    if (updateMode === "REPLACE") {
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
