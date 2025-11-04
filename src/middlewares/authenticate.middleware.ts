import { NextFunction, Request, Response } from "express";
import { ApiErrorResponse, jwtToken } from "../utils";
import { config } from "../config";
import { Role, User } from "../models";
import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import { IReqUser } from "../interfaces";

interface AuthUserLean {
  _id: Types.ObjectId;
  roleId: Types.ObjectId;
  email: string;
}
// Middleware
export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return next(new ApiErrorResponse(401, "Missing or invalid Authorization header"))
    }

    const token = authHeader.split(" ")[1];
    const { data , success, error } = jwtToken.verifyAccessToken(token) ;
    if (!success) {
        return next(new ApiErrorResponse(StatusCodes.BAD_REQUEST, error!!));
    }
    const decoded = data as { userId: string };

    // Otherwise query DB
    const user = await User.findById(decoded.userId, {roleId: 1, email: 1}).lean<AuthUserLean>();
    if (!user ) {
        return next(new ApiErrorResponse(StatusCodes.UNAUTHORIZED, "User not found or inactive"));
    }

    const role = await Role.findById(user.roleId).lean();
    if (!role) {
      return next(new ApiErrorResponse(StatusCodes.UNAUTHORIZED, "User role not found"));
    }

    const reqUser: IReqUser = {
      id: user._id.toString(),
      email: user.email,
      roleId: role._id.toString(),
      role: {
        name: role.name,
        permissions: role.permissions,
      },
    };

    // Cache user for faster subsequent requests
    // await redisClient.setEx(cacheKey, 300, JSON.stringify(reqUser));

    req.user = reqUser;
    next();
  } catch (err:any) {
      if(err instanceof ApiErrorResponse){
        return next(err)
      }
      return next(new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
  }
}