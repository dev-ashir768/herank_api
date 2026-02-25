import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userController } from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { userSchema } from "../schemas/user.schema";

const router = Router();

router.get(
  "/:userId",
  validate(userSchema.userById),
  authMiddleware.verifyToken,
  authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN", "USER"]),
  userController.getUserById,
);
router.put("/", validate(userSchema.updateUser), authMiddleware.verifyToken, authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN", "USER"]), userController.updateUserById)

export default router;
