import { prisma } from "../config/db";
import { MenuResponse } from "../types";
import { CreateMenuInput, UpdateMenuInput } from "../schemas/menu.schema";

export const menuService = {
  getAllMenus: async (): Promise<MenuResponse[] | []> => {
    const allMenus = await prisma.menus.findMany();

    return allMenus;
  },

  getMenuById: async (menuId: number): Promise<MenuResponse | null> => {
    return await prisma.menus.findUnique({
      where: { id: menuId },
    });
  },

  createMenu: async (data: CreateMenuInput): Promise<MenuResponse> => {
    return await prisma.menus.create({
      data,
    });
  },

  updateMenu: async (
    menuId: number,
    data: UpdateMenuInput,
  ): Promise<MenuResponse> => {
    return await prisma.menus.update({
      where: { id: menuId },
      data,
    });
  },

  deleteMenu: async (menuId: number): Promise<MenuResponse> => {
    return await prisma.menus.delete({
      where: { id: menuId },
    });
  },
};
