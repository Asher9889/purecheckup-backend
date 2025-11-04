import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { config } from "../../config";

interface TokenResult {
  success: boolean;
  data?: JwtPayload | string;
  error?: string;
}

/**
 * Generate an access token (1h validity)
 */
export function generateAccessToken(userId: string): string {
  try {
    return jwt.sign({ userId }, config.accessSecret, { expiresIn: "1h" });
  } catch (error) {
    // This rarely fails, but we guard anyway
    throw new Error("Failed to generate access token");
  }
}

/**
 * Verify an access token safely
 */
export function verifyAccessToken(token: string): TokenResult {
  try {
    const decoded = jwt.verify(token, config.accessSecret);
    return { success: true, data: decoded };
  } catch (error) {
    const err = error as VerifyErrors;
    return {
      success: false,
      error:
        err.name === "TokenExpiredError"
          ? "Access token expired"
          : "Invalid access token",
    };
  }
}

/**
 * Generate a refresh token (7d validity)
 */
export function generateRefreshToken(userId: string): string {
  try {
    return jwt.sign({ userId }, config.refreshSecret, { expiresIn: "7d" });
  } catch {
    throw new Error("Failed to generate refresh token");
  }
}

/**
 * Verify a refresh token safely
 */
export function verifyRefreshToken(token: string): TokenResult {
  try {
    const decoded = jwt.verify(token, config.refreshSecret);
    return { success: true, data: decoded };
  } catch (error) {
    const err = error as VerifyErrors;
    return {
      success: false,
      error:
        err.name === "TokenExpiredError"
          ? "Refresh token expired"
          : "Invalid refresh token",
    };
  }
}
