import { Role } from "../../generated/prisma/enums";

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

// Permission
export type Permission = {
  menuId: number;
  canView: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
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
