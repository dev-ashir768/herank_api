import { z } from "zod";
import { Role } from "../../generated/prisma/enums";
import { UpdateMode } from "../../generated/prisma/enums";

export const userSchema = {
  updateUser: z.object({
    body: z.object({
      userId: z.number({ message: "User ID is required" }),
      email: z.email("Email is required"),
      password: z
        .string({ message: "Password is required" })
        .min(8, "Password must be at least 8 characters long")
        .optional(),
      role: z.enum(Role, { message: "Role is required" }).optional(),
      updateMode: z.enum(UpdateMode, { message: "Update mode is required" }),
      permissions: z
        .array(
          z.object({
            menuId: z.number({ message: "Menu ID is required" }),
            canView: z
              .boolean({ message: "Can view is required" })
              .default(false),
            canCreate: z
              .boolean({ message: "Can create is required" })
              .default(false),
            canUpdate: z
              .boolean({ message: "Can update is required" })
              .default(false),
            canDelete: z
              .boolean({ message: "Can delete is required" })
              .default(false),
          }),
          { message: "Permissions are required" },
        )
        .min(1, "At least one permission is required."),
    }),
  }),
  userById: z.object({
    params: z.object({
      userId: z.coerce.number({ message: "User ID is required" }),
    }),
  }),
  getAllUsers: z.object({
    query: z
      .object({
        page: z.coerce.number().min(1).default(1),
        limit: z.coerce.number().min(1).max(100).default(10),
      })
      .optional(),
  }),
  createUser: z.object({
    body: z.object({
      email: z.string().email("Invalid email format"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
      role: z.enum(Role as any, { message: "Invalid role" }).default("USER"),
      isActive: z.boolean().default(true),
    }),
  }),
  deleteUserById: z.object({
    params: z.object({
      userId: z.coerce.number({ message: "User ID is required" }),
    }),
  }),
};

export type UpdateUserInput = z.infer<typeof userSchema.updateUser>["body"];
export type UserByIdInput = z.infer<typeof userSchema.userById>["params"];
export type GetAllUsersInput = z.infer<typeof userSchema.getAllUsers>["query"];
export type CreateUserInput = z.infer<typeof userSchema.createUser>["body"];
export type DeleteUserByIdInput = z.infer<
  typeof userSchema.deleteUserById
>["params"];
