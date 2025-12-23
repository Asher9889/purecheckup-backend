import { NextFunction, Request, Response } from "express";
import { authService } from "../services";
import { StatusCodes } from "http-status-codes";
import { ApiSuccessResponse, ApiErrorResponse, authResponse, validateLoginUserSchema, getCookieOptions, sendForgetPasswordEmail } from "../utils";
import { AuthRequest } from "../interfaces";



async function signUp(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const { data, flag } = await authService.register(req.body);
        return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, authResponse.created, data))
    } catch (error: any) {
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        next(new ApiSuccessResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }


}

async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const value = validateLoginUserSchema(req.body);


        const { refreshToken, accessToken, safeUser } = await authService.login(value);

        // Set refresh token in secure cookie
        res.cookie("refreshToken", refreshToken, getCookieOptions("refresh"));
        res.cookie("accessToken", accessToken, getCookieOptions("access"));

        return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, authResponse.loggedIn, safeUser));
    } catch (error: any) {
        console.log("error is:", error)
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        next(new ApiSuccessResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}

//------- refresh ------>
async function refresh(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.refreshToken;
        console.log("refreshToken is", token)
        if (!token) {
            throw new ApiErrorResponse(StatusCodes.UNAUTHORIZED, authResponse.noRefreshToken);
        }
        const tokens = await authService.refresh(token);

        res.cookie("refreshToken", tokens.refreshToken, getCookieOptions("refresh"));
        res.cookie("accessToken", tokens.accessToken, getCookieOptions("access"));
        return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, authResponse.tokenRefreshed));

    } catch (error: any) {
        console.log("error is:", error)
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        next(new ApiSuccessResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
};

async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        res.clearCookie("refreshToken", getCookieOptions("refresh"));
        res.clearCookie("accessToken", getCookieOptions("access"));

        return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, "Logged out successfully"));

    } catch (error: any) {
        console.log("error is:", error)
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        next(new ApiSuccessResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}

async function me(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const user = req.user;
        if (!user) {
            throw new ApiErrorResponse(StatusCodes.UNAUTHORIZED, authResponse.loginFirst)
        }
        return res
            .status(StatusCodes.OK)
            .json(new ApiSuccessResponse(StatusCodes.OK, authResponse.foundUser, user));
    } catch (err: any) {
        console.error("ME endpoint error:", err);
        if (err instanceof ApiErrorResponse) {
            return next(err);
        }
        next(new ApiErrorResponse(StatusCodes.UNAUTHORIZED, err.message || authResponse.loginFirst));
    }
}

async function forgetPassword(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.body;
        if (!email || typeof email !== "string" || email.trim() === "") {
            throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, authResponse.emailRequired);
        }

        const resetToken = await authService.forgetPassword(email)

        const clientUrl = process.env.CLIENT_URL || `${req.protocol}://${req.get('host')}`;
        const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

        const success = await sendForgetPasswordEmail(email, resetUrl);

        if (!success) {
            throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, authResponse.passResetlinkNotSent)
        }
        return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, authResponse.passResetlinkSent))
    } catch (err: any) {
        console.error("forgetPassword endpoint error:", err);
        if (err instanceof ApiErrorResponse) {
            return next(err);
        }
        next(new ApiErrorResponse(StatusCodes.UNAUTHORIZED, err.message || authResponse.loginFirst));
    }
}


export { signUp, login, refresh, logout, me, forgetPassword }