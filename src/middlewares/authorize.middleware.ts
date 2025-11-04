import { NextFunction, Request, Response } from "express";
import { RoleService } from "../domain";
import { ROLE } from "../constants";
import { ApiErrorResponse } from "../utils";
import { StatusCodes } from "http-status-codes";

async function authorize(resource: string, action: string) {
  const permission = `${resource}:${action}`; // e.g., blog:create
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // must be set by auth middleware (JWT)
    if (!user) return res.status(401).send({ message: "Unauthorized" });

    // quick super-admin short-circuit
    if (user.role?.name === ROLE.SUPER_ADMIN) return next();

    // Check cached role-permissions
    const roleService = new RoleService();
    const allowed = await roleService.hasPermission(user.roleId, permission);
    if (!allowed) {
      // auditLog({ userId: user.id, permission, allowed: false, path: req.path });
      return next(new ApiErrorResponse(StatusCodes.UNAUTHORIZED, "Forbidden"));
    }

    // auditLog({ userId: user.id, permission, allowed: true, path: req.path });
    next();
  };
}
