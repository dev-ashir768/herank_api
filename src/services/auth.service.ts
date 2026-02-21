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
} from "../types/auth.type";
import { Role } from "../../generated/prisma/enums";

export const authService = {
  createUser: async (data: SignupInput): Promise<SignupResponse> => {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await hashPassword(data.password);

    return prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role || Role.USER,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
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
