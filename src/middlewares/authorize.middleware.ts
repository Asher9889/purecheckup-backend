import { Request, Response, NextFunction } from "express";
import { RoleService } from "../domain";
import { ROLE } from "../constants";
import { ApiErrorResponse } from "../utils";
import { StatusCodes } from "http-status-codes";

const roleService = new RoleService();

/**
 * Factory middleware for RBAC authorization.
 * @param resource - e.g. "blog"
 * @param action - e.g. "create"
 */
export function authorize(resource: string, action: string) {
  const permission = `${resource}:${action}`; // e.g. "blog:create"

  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return next(new ApiErrorResponse(StatusCodes.UNAUTHORIZED, "User not authenticated"));
      }

      // Fast path for super admin
      if (user.role?.name === ROLE.SUPER_ADMIN) {
        return next();
      }

      const hasAccess = await roleService.hasPermission(user.roleId, permission);
      if (!hasAccess) {
        // auditLog({ userId: user.id, permission, allowed: false, path: req.path });
        return next(new ApiErrorResponse(StatusCodes.FORBIDDEN, "Access denied"));
      }

      // auditLog({ userId: user.id, permission, allowed: true, path: req.path });
      next();

    } catch (err) {
      next(new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Authorization failed"));
    }
  };
}
