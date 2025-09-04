import { CookieOptions } from "express";

const isProd = process.env.NODE_ENV === "production";

/**
 * Base cookie options used across the app.
 */
const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd, // only send over HTTPS in production
  sameSite: isProd ? "none" : "lax", // cross-site support in prod
};

/**
 * Generate cookie options dynamically.
 * @param type "access" | "refresh"
 */
export function getCookieOptions(type: "access" | "refresh"): CookieOptions {
  if (type === "access") {
    return {
      ...baseCookieOptions,
      path: "/", // accessible everywhere
      maxAge: 15 * 60 * 1000, // 15 mins
    };
  }

  if (type === "refresh") {
    return {
      ...baseCookieOptions,
      path: "/api/v1/auth/refresh", // restrict refresh cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
  }

  return baseCookieOptions;
}
