import { StatusCodes } from "http-status-codes";
import { DecodedToken, ILoginUser, IUser } from "../interfaces";
import { User } from "../models";
import { ApiErrorResponse, authResponse, sendAdminSignupNotification, sendUserWelcomeEmail } from "../utils";
import { config } from "../config";
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import crypto from "crypto";

type SafeUser = {
	id: string;
	fullName: string;
	email: string;
	phone: string;
	accessToken?: string
};

async function register(user: IUser) {
	try {
		const isFound = await User.findOne({
			$or: [
				{ email: user.email },
				{ phone: user.phone }
			]
		})

		if (isFound) {
			throw new ApiErrorResponse(StatusCodes.CONFLICT, authResponse.ifFound);
		}

		const newUser = new User(user);
		const savedUser = await newUser.save();
		// await sendAdminSignupNotification(config.clientEmail, savedUser.email);
		// await sendUserWelcomeEmail(savedUser.email);



		return { data: newUser, flag: true };
	} catch (error: any) {
		if (error instanceof ApiErrorResponse) {
			throw error;
		}
		throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
	}
}

async function login(user: ILoginUser) {
	const existingUser = await User.findOne({ email: user.email });
	if (!existingUser) {
		throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, authResponse.notFound);
	}

	const isPasswordValid = await existingUser.comparePassword(user.password);
	if (!isPasswordValid) {
		throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, authResponse.inValidCredentials)
	}

	const safeUser: SafeUser = {
		id: existingUser._id as string,
		fullName: existingUser.fullName,
		email: existingUser.email,
		phone: String(existingUser.phone),
	};


	const accessToken = existingUser.generateAccessToken();
	const refreshToken = existingUser.generateRefreshToken();

	return { accessToken, refreshToken, safeUser }
}

async function refresh(refreshToken: string) {

	try {
		const decodedInfo = jwt.verify(refreshToken, config.refreshSecret) as DecodedToken;

		const user = await User.findById(decodedInfo.id);
		if (!user) {
			throw new ApiErrorResponse(StatusCodes.UNAUTHORIZED, authResponse.userNotFound);
		}

		const newAccessToken = user.generateAccessToken();
		const newRefreshToken = user.generateRefreshToken();
		return { accessToken: newAccessToken, refreshToken: newRefreshToken };
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			// token is expired
			throw new ApiErrorResponse(StatusCodes.UNAUTHORIZED, "Access token expired, please refresh");
		}

		if (error instanceof NotBeforeError) {
			// token not yet active
			throw new ApiErrorResponse(StatusCodes.UNAUTHORIZED, "Token not active yet");
		}

		if (error instanceof JsonWebTokenError) {
			// any other JWT error (invalid signature, malformed, etc.)
			throw new ApiErrorResponse(StatusCodes.UNAUTHORIZED, "Invalid token");
		}
		throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error");
	}
}

async function forgetPassword(email: string) {
	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw new ApiErrorResponse(StatusCodes.NOT_FOUND, authResponse.notFound);
		}

		// generate token
		const resetToken = crypto.randomBytes(32).toString("hex");

		user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

		user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // expired after 15 mins
		await user.save();

		return resetToken;
	} catch (error:any) {
		console.error("forget error service:", error)
		if (error instanceof ApiErrorResponse) {
			throw error;
		}
		throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
	}
}


export { register, login, refresh, forgetPassword };