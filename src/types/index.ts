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

// Login Response
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
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
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTAccessTokenResponse;
    }
  }
}
