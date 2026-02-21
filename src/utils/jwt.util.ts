import jwt from "jsonwebtoken";
import { config } from "../config";
import {
  JWTAccessTokenResponse,
  JWTRefreshTokenResponse,
} from "../types/auth.type";

export const generateAccessToken = (payload: JWTAccessTokenResponse) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: JWTRefreshTokenResponse) => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.JWT_REFRESH_SECRET);
};