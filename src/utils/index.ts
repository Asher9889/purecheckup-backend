import ApiErrorResponse from "./api-response/apiErrorResponse";
import ApiSuccessResponse from "./api-response/apiSuccessResponse";

import checkRouteExists from "./check-route-exists/checkRouteExists";
import globalErrorHandler from "./global-error-handler/globalErrorHandler";

import { blogResponse, authResponse } from "./api-response/responseMessages";

import { getCookieOptions } from "./cookie-options/cookieOptions";

//============ Schema Validations =================>
import { validateUserSchema, validateLoginUserSchema } from "./schema-validation/validateUser.schema";
import { validateScheduleSurgeryForm, validateTalkToInsuranceAdvisorForm, validateQuickEmiCheckForm } from "./schema-validation/contact.schema";
import { validateBlogSchema } from "./schema-validation/blog.schema";

//============= Node Mailer ===============>
import { sendAdminSignupNotification, sendUserWelcomeEmail, sendAdminConsultationNotification, sendUserConsultationConfirmation, sendForgetPasswordEmail } from "./nodemailer/sendMail";


//============= Tokens ===============>
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "./tokens/tokens.utils";


//============= Cloudinary =============>
import { uploadImageFromFile, getAutoCropUrl, getOptimizedUrl } from "./cloudinary/upload";

export const cloudinary = {
    uploadImageFromFile,
    getAutoCropUrl,
    getOptimizedUrl
}

export const jwtToken = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}



export { validateBlogSchema, ApiErrorResponse, ApiSuccessResponse, checkRouteExists, globalErrorHandler, blogResponse, validateUserSchema, validateLoginUserSchema, authResponse, sendAdminSignupNotification, sendUserWelcomeEmail, sendAdminConsultationNotification, sendUserConsultationConfirmation, sendForgetPasswordEmail, getCookieOptions, validateScheduleSurgeryForm, validateTalkToInsuranceAdvisorForm, validateQuickEmiCheckForm }  