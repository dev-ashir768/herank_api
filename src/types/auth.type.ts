import { Role } from "../../generated/prisma/enums";

export interface JWTAccessTokenResponse {
  id: number;
  email: string;
  role: Role;
}

export interface JWTRefreshTokenResponse {
  id: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export type User = {
  id: number;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export interface SignupResponse {
  id: number;
  email: string;
  role: Role;
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
