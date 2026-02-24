import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { menuController } from "../controllers/menu.controller";

const router = Router();

router.get(
  "/all",
  authMiddleware.verifyToken,
  authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN", "USER"]),
  menuController.getAllMenus,
);

export default router;
