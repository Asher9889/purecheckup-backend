import Joi from "joi";
import { IUser, ILoginUser } from "../../interfaces";

interface IRegisterUser extends IUser {
    password: string;
    confirmPassword: string;
}

// Sign-up validation
function validateUserSchema(userDetails: IRegisterUser) {
    const userSchema = Joi.object({
        fullName: Joi.string()
            .min(3)
            .required()
            .messages({
                "string.base": "Full name must be a string.",
                "string.empty": "Full name is required.",
                "string.min": "Full name must be at least {#limit} characters.",
                "any.required": "Full name is required.",
            }),

        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.email": "Please enter a valid email address.",
                "string.empty": "Phone number is required.",
                "any.required": "Email is required.",
            }),

        phone: Joi.string()
            .pattern(/^\+?[0-9]{10,15}$/)
            .required()
            .messages({
                "string.pattern.base": "Phone number must be 10–15 digits (optionally starting with +).",
                "string.empty": "Phone number is required.",
                "any.required": "Phone number is required.",
            }),

        password: Joi.string()
            .min(6)
            .required()
            .messages({
                "string.min": "Password must be at least {#limit} characters.",
                "string.empty": "Phone number is required.",
                "any.required": "Password is required.",
            }),

        confirmPassword: Joi.string()
            .valid(Joi.ref("password"))
            .required()
            .messages({
                "any.only": "Confirm password must match the password.",
                "string.empty": "Phone number is required.",
                "any.required": "Confirm password is required.",
            }),
    });

    return userSchema.validate(userDetails);

}

// Login Validation
function validateLoginUserSchema(userDetails: ILoginUser) {
    const loginUserSchema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.email": "Please enter a valid email address.",
                "string.empty": "Email is required.",
                "any.required": "Email is required.",
            }),

        password: Joi.string()
            .min(6)
            .required()
            .messages({
                "string.min": "Password must be at least {#limit} characters.",
                "string.empty": "Phone number is required.",
                "any.required": "Password is required.",
            }),
    });

    return loginUserSchema.validate(userDetails);

}


export { validateUserSchema, validateLoginUserSchema }

