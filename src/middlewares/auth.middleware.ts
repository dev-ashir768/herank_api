import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";
import { JWTAccessTokenResponse } from "../types";
import { verifyAccessToken } from "../utils/jwt.util";
import { ApiRes } from "../utils/apiResponse.util";

export const authMiddleware = {
  verifyToken: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return ApiRes.error(res, "Unauthorized", 401);
    }

    try {
      const decoded = verifyAccessToken(token!) as JWTAccessTokenResponse;

      req.user = decoded;
      next();
    } catch (error) {
      return ApiRes.error(res, "Invalid token", 401);
    }
  },

  restrictTo:
    (roles: string[]) =>
    (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
      if (!roles.includes(req.user?.role!)) {
        return ApiRes.error(
          res,
          "You do not have permission to perform this action",
          403,
        );
      }
      next();
    },

  // checkPermission: (
  //   action: "canView" | "canCreate" | "canUpdate" | "canDelete",
  // ) =>
  //   asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  //     const user = req.user;

  //     if (!user) {
  //       ApiRes.error(res, "Unauthorized", 401);
  //       return;
  //     }

  //     if (user.role === "SUPER_ADMIN") {
  //       return next();
  //     }

  //     const requestPath = req.baseUrl || req.path;

  //     // Find the menu in DB that matches this URL route
  //     const menu = await prisma.menus.findFirst({
  //       where: {
  //         url: {
  //           // Using contains to match base paths if URLs in DB are like "/menus"
  //           equals: requestPath,
  //         },
  //         isActive: true,
  //       },
  //     });

  //     if (!menu) {
  //       ApiRes.error(res, "Menu not found or disabled in system", 404);
  //       return;
  //     }

  //     const permission = await prisma.permissions.findFirst({
  //       where: {
  //         userId: user.id,
  //         menuId: menu.id,
  //       },
  //     });

  //     if (!permission || !permission[action]) {
  //       ApiRes.error(
  //         res,
  //         "You do not have permission to access this resource",
  //         403,
  //       );
  //       return;
  //     }

  //     next();
  //   }),
};
