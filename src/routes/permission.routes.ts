import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { permissionController } from "../controllers/permission.controller";
import { validate } from "../middlewares/validate.middleware";
import { permissionSchema } from "../schemas/permission.schema";

const router = Router();

router.get(
  "/",
  validate(permissionSchema.getAllPermissions),
  authMiddleware.verifyToken,
  authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN"]),
  permissionController.getAllPermissions,
);

router.get(
  "/:permissionId",
  validate(permissionSchema.getPermissionById),
  authMiddleware.verifyToken,
  authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN"]),
  permissionController.getPermissionById,
);

router.post(
  "/",
  validate(permissionSchema.createPermission),
  authMiddleware.verifyToken,
  authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN"]),
  permissionController.createPermission,
);

router.put(
  "/:permissionId",
  validate(permissionSchema.updatePermission),
  authMiddleware.verifyToken,
  authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN"]),
  permissionController.updatePermission,
);

router.delete(
  "/:permissionId",
  validate(permissionSchema.deletePermission),
  authMiddleware.verifyToken,
  authMiddleware.restrictTo(["SUPER_ADMIN", "ADMIN"]),
  permissionController.deletePermission,
);

export default router;
