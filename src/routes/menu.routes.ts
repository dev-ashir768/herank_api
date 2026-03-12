import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { menuController } from "../controllers/menu.controller";
import { validate } from "../middlewares/validate.middleware";
import { menuSchema } from "../schemas/menu.schema";

const router = Router();

router.get(
  "/all",
  authMiddleware.verifyToken,
  authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN", "USER"]),
  menuController.getAllMenus,
);

router.get(
  "/:menuId",
  validate(menuSchema.getMenuById),
  authMiddleware.verifyToken,
  authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN", "USER"]),
  menuController.getMenuById,
);

router.post(
  "/",
  validate(menuSchema.createMenu),
  authMiddleware.verifyToken,
  authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN"]),
  menuController.createMenu,
);

router.put(
  "/:menuId",
  validate(menuSchema.updateMenu),
  authMiddleware.verifyToken,
  authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN"]),
  menuController.updateMenu,
);

router.delete(
  "/:menuId",
  validate(menuSchema.deleteMenu),
  authMiddleware.verifyToken,
  authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN"]),
  menuController.deleteMenu,
);

export default router;
