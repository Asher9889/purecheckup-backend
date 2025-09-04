import { NextFunction, Request, Response } from "express";
import { ApiErrorResponse, authResponse, validateUserSchema } from "../utils";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { AuthRequest, DecodedToken } from "../interfaces";
import { User } from "../models";

function validateUser(req: Request, res: Response, next: NextFunction) {
    const { value, error } = validateUserSchema(req.body);

    if (error) {
        const statusCode = StatusCodes.BAD_REQUEST;
        const msg = error.message;
        return next(new ApiErrorResponse(statusCode, msg));
    }

    next();
}




// Inserts user to req.user

const openRoutes = [
    "/api/v1/auth/login",
    "/api/v1/auth/register",
    "/api/v1/auth/refresh",
    "/api/v1/auth/forget-password",
    "/api/v1/blogs",
];
async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        if (openRoutes.includes(req.path)) {
            return next();
        }
        
        const token = req.cookies.accessToken;
        if (!token) {
            throw new ApiErrorResponse(StatusCodes.UNAUTHORIZED, authResponse.noRefreshToken);
        }

        const decoded: DecodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as any;
        const user = await User.findById(decoded.id).select("-password").lean();

        if (!user?._id) {
            next(new ApiErrorResponse(StatusCodes.UNAUTHORIZED, authResponse.noAuth))
        }
        // Attach user info to request
        req.user = user;
        next();
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return next(new ApiErrorResponse(StatusCodes.UNAUTHORIZED, authResponse.tokenExpired))
        } else if (err.name === "JsonWebTokenError") {
            return next(new ApiErrorResponse(StatusCodes.UNAUTHORIZED, authResponse.noAuth))
        } else if (err.name === "NotBeforeError") {
            return next(new ApiErrorResponse(StatusCodes.UNAUTHORIZED, "Token is not yet active"))
        }
        return next(
            new ApiErrorResponse(StatusCodes.UNAUTHORIZED, err.message)
        );
    }
};

export { authMiddleware }
export default validateUser;