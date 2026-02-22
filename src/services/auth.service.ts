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

export const authService = {
  createUser: async (data: SignupInput): Promise<SignupResponse> => {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const menuIds = data.permissions.map((p) => p.menuId);
    const existingMenus = await prisma.menus.findMany({
      where: { id: { in: menuIds } },
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
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      permissions: newUser.permissions,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  },

  loginUser: async (data: LoginInput): Promise<LoginResponse> => {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) throw new Error("User not found");

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
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
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
