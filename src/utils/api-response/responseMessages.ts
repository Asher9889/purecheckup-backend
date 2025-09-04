const blogResponse = {
    created: "Blog created successfully.",
    fetched: "Blogs fetched successfully",
    idRequired: "Please provide valid blog id.",
    notExists: "Blog does not exits for this id",
    updated: "Blog updated successfully.",
    deleted: "Blog deleted successfully."
}

const authResponse = {
    ifFound : "User with this email or phone number already exists",
    notFound: "No user found!! Sorry try with other ones.",
    created: "User created successfully.",
    inValidCredentials: "Invalid, Please try with correct password.",
    loggedIn: "User logged in successfully",
    noRefreshToken: "No refresh token provided", 
    noAuth: "Invalid or expired refresh token",
    userNotFound: "User not found",
    tokenRefreshed: "Tokens refreshed successfully",
    tokenExpired: "Token is expired",
    loginFirst: "Please first login",
    foundUser: "User fetched successfully",
    emailRequired: "Email is required",
    passResetlinkSent: "Password reset link sent successfully",
    passResetlinkNotSent: "Failed to sent password reset link"
}

export { blogResponse, authResponse };