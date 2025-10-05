import Joi from "joi";
import { IUser, ILoginUser, IConditionConsultationForm } from "../../interfaces";

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

// patient Validation
function validateConditionPatientSchema (patientData:IConditionConsultationForm ) {
    const patientSchema = Joi.object({
        fullName: Joi.string().required().messages({
            'string.empty': 'Full name is required',
            'any.required': 'Full name is required'
        }),
        mobileNumber: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({
                'string.pattern.base': 'Please enter a valid mobile number',
                'string.empty': 'Mobile number is required',
                'any.required': 'Mobile number is required'
            }),
        city: Joi.string().required().messages({
            'string.empty': 'City is required',
            'any.required': 'City is required'
        }),
        mode: Joi.string().valid('online', 'clinic').required().messages({
            'string.empty': 'Consultation mode is required',
            'any.only': 'Consultation mode must be either online or offline',
            'any.required': 'Consultation mode is required'
        }),
        image: Joi.any().optional()
    })
    return patientSchema.validate(patientData);
};


export { validateUserSchema, validateLoginUserSchema, validateConditionPatientSchema }

