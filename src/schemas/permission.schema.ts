import { z } from "zod";

export const permissionSchema = {
  getPermissionById: z.object({
    params: z.object({
      permissionId: z.coerce.number({ message: "Permission ID is required" }),
    }),
  }),
  getAllPermissions: z.object({
    query: z
      .object({
        userId: z.coerce.number().optional(),
        menuId: z.coerce.number().optional(),
      })
      .optional(),
  }),
  createPermission: z.object({
    body: z.object({
      userId: z.number({ message: "User ID is required" }),
      menuId: z.number({ message: "Menu ID is required" }),
      canView: z.boolean().default(false),
      canCreate: z.boolean().default(false),
      canUpdate: z.boolean().default(false),
      canDelete: z.boolean().default(false),
    }),
  }),
  updatePermission: z.object({
    params: z.object({
      permissionId: z.coerce.number({ message: "Permission ID is required" }),
    }),
    body: z.object({
      canView: z.boolean().optional(),
      canCreate: z.boolean().optional(),
      canUpdate: z.boolean().optional(),
      canDelete: z.boolean().optional(),
    }),
  }),
  deletePermission: z.object({
    params: z.object({
      permissionId: z.coerce.number({ message: "Permission ID is required" }),
    }),
  }),
};

export type GetPermissionByIdInput = z.infer<
  typeof permissionSchema.getPermissionById
>["params"];
export type GetAllPermissionsInput = z.infer<
  typeof permissionSchema.getAllPermissions
>["query"];
export type CreatePermissionInput = z.infer<
  typeof permissionSchema.createPermission
>["body"];
export type UpdatePermissionInput = z.infer<
  typeof permissionSchema.updatePermission
>["body"];
export type DeletePermissionInput = z.infer<
  typeof permissionSchema.deletePermission
>["params"];
