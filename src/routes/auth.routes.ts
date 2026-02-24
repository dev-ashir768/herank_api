import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { authSchema } from "../schemas/auth.schema";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/signup",
  authMiddleware.verifyToken,
  authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN"]),
  validate(authSchema.signup),
  authController.signup,
);
router.post("/login", validate(authSchema.login), authController.login);
router.post("/refresh", validate(authSchema.refresh), authController.refresh);

export default router;
