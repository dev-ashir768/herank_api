import { z } from "zod";

export const menuSchema = {
  getMenuById: z.object({
    params: z.object({
      menuId: z.coerce.number({ message: "Menu ID is required" }),
    }),
  }),
  createMenu: z.object({
    body: z.object({
      title: z.string({ message: "Title is required" }),
      url: z.string({ message: "URL is required" }),
      icon: z.string({ message: "Icon is required" }),
      description: z.string().optional(),
      menuId: z.number().optional(),
      parentId: z.number().optional(),
      isActive: z.boolean().default(true),
    }),
  }),
  updateMenu: z.object({
    params: z.object({
      menuId: z.coerce.number({ message: "Menu ID is required" }),
    }),
    body: z.object({
      title: z.string().optional(),
      url: z.string().optional(),
      icon: z.string().optional(),
      description: z.string().optional().nullable(),
      menuId: z.number().optional().nullable(),
      parentId: z.number().optional().nullable(),
      isActive: z.boolean().optional(),
    }),
  }),
  deleteMenu: z.object({
    params: z.object({
      menuId: z.coerce.number({ message: "Menu ID is required" }),
    }),
  }),
};

export type GetMenuByIdInput = z.infer<typeof menuSchema.getMenuById>["params"];
export type CreateMenuInput = z.infer<typeof menuSchema.createMenu>["body"];
export type UpdateMenuInput = z.infer<typeof menuSchema.updateMenu>["body"];
export type DeleteMenuInput = z.infer<typeof menuSchema.deleteMenu>["params"];
