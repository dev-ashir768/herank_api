import { Menus } from "../../generated/prisma/client";
import { Role } from "../../generated/prisma/enums";

// API Response
export interface ApiResponse<T = any> {
  status: 0 | 1;
  message: string;
  data: T[];
}

// JWT Access Token Response
export interface JWTAccessTokenResponse {
  id: number;
  email: string;
  role: Role;
}

// JWT Refresh Token Response
export interface JWTRefreshTokenResponse {
  id: number;
}

// Refresh Token Response
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// User
export type User = {
  id: number;
  email: string;
  role: Role;
  isActive: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

// Menu Details
export type MenuDetails = {
  title: string;
  icon: string;
  url: string;
  parentId: number | null;
};

// Permission
export type Permission = {
  menuId: number;
  canView: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  menu: MenuDetails;
};

// Signup Response
export interface SignupResponse {
  id: number;
  email: string;
  role: Role;
  isActive: boolean;
  deletedAt: Date | null;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}

// Login Response
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  permissions: Permission[];
}

// User by ID Response
export interface UserByIdResponse {
  id: number;
  email: string;
  role: Role;
  permissions: Permission[];
  isActive: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Menu Response
export interface MenuResponse extends Menus {}

declare global {
  namespace Express {
    interface Request {
      user?: JWTAccessTokenResponse;
    }
  }
}
