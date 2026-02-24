import { prisma } from "../config/db";
import { MenuResponse } from "../types";

export const menuService = {
  getAllMenus: async (): Promise<MenuResponse[] | []> => {
    const allMenus = await prisma.menus.findMany();

    return allMenus;
  },
};
