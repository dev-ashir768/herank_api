import { prisma } from "../config/db";
import { comparePassword, hashPassword } from "../utils/password.util";
import {
  LoginInput,
  SignupInput,
  RefreshTokenInput,
} from "../schemas/auth.schema";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.util";
import {
  LoginResponse,
  SignupResponse,
  RefreshTokenResponse,
  JWTRefreshTokenResponse,
} from "../types";
import { Menus, Permissions, User } from "../../generated/prisma/client";

export const authService = {
  getExistingUser: async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  permissionsByUserId: async (
    userId: number,
  ): Promise<(Permissions & { menu: Menus })[] | null> => {
    return await prisma.permissions.findMany({
      where: { userId },
      include: {
        menu: true,
      },
    });
  },

  createUser: async (data: SignupInput): Promise<SignupResponse> => {
    const existingUser = await authService.getExistingUser(data.email);

    if (existingUser) {
      console.log("existingUser", existingUser);
      if (existingUser.isActive) {
        throw new Error("Email already registered");
      } else {
        throw new Error("Account is disabled or not found.");
      }
    }

    const menuIds = data.permissions.map((p) => p.menuId);
    const existingMenus = await prisma.menus.findMany({
      where: { id: { in: menuIds }, isActive: true },
      select: { id: true },
    });

    if (existingMenus.length !== menuIds.length) {
      throw new Error("One or more Menu IDs are invalid");
    }

    const hashedPassword = await hashPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role,
        permissions: {
          create: data.permissions.map((permissions) => ({
            menuId: permissions.menuId,
            canView: permissions.canView,
            canCreate: permissions.canCreate,
            canUpdate: permissions.canUpdate,
            canDelete: permissions.canDelete,
          })),
        },
      },
      select: {
        id: true,
        email: true,
        role: true,
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
        isActive: true,
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      permissions: newUser.permissions,
      isActive: newUser.isActive,
      deletedAt: newUser.deletedAt,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  },

  loginUser: async (data: LoginInput): Promise<LoginResponse> => {
    const user = await authService.getExistingUser(data.email);

    if (!user) throw new Error("Account not found.");
    if (!user.isActive) throw new Error("Account is disabled.");

    const permissions = await authService.permissionsByUserId(user.id);

    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({ id: user.id });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        deletedAt: user.deletedAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      permissions: permissions!
        .filter((p) => p.menu.isActive)
        .map((p) => ({
          menuId: p.menuId,
          canView: p.canView,
          canCreate: p.canCreate,
          canUpdate: p.canUpdate,
          canDelete: p.canDelete,
          menu: {
            title: p.menu.title,
            icon: p.menu.icon,
            url: p.menu.url,
            parentId: p.menu.parentId,
          },
        })),
    };
  },

  refreshToken: async (
    data: RefreshTokenInput,
  ): Promise<RefreshTokenResponse> => {
    try {
      const decoded = verifyRefreshToken(
        data.refreshToken,
      ) as JWTRefreshTokenResponse;

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user || user.refreshToken !== data.refreshToken) {
        throw new Error("Invalid or expired refresh token");
      }

      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      const refreshToken = generateRefreshToken({ id: user.id });

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  },
};
