const openRoutes = [
    "/api/v1/auth/login",
    "/api/v1/auth/register",
    "/api/v1/auth/refresh",
    "/api/v1/auth/forget-password",
    "/api/v1/me"
];


if (openRoutes.includes("/api/v1/me")) {
    console.log("Skipping auth for open route: /api/v1/me");
   
}else {
    // Handle authenticated routes
    console.log("Processing authenticated route: other routes");
}