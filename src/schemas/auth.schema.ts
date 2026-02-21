import { z } from "zod";
import { Role } from "../../generated/prisma/enums";

export const authSchema = {
  signup: z.object({
    body: z.object({
      email: z.email("Email is required"),
      password: z
        .string({ message: "Password is required" })
        .min(8, "Password must be at least 8 characters long"),
      role: z.enum(Role, { message: "Role is required" }).optional(),
    }),
  }),
  login: z.object({
    body: z.object({
      email: z.email("Email is required"),
      password: z
        .string({ message: "Password is required" })
        .min(8, "Password must be at least 8 characters long"),
    }),
  }),
  refresh: z.object({
    body: z.object({
      refreshToken: z.string({ message: "Refresh token is required" }),
    }),
  }),
};

export type SignupInput = z.infer<typeof authSchema.signup>["body"];
export type LoginInput = z.infer<typeof authSchema.login>["body"];
export type RefreshTokenInput = z.infer<typeof authSchema.refresh>["body"];
