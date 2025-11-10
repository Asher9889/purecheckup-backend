import Joi from "joi";
import { IQuickDoctorConnectForm, IQuickEmiCheckForm, IRequestCallbackForm, IScheduleSurgeryForm, ITalkToInsuranceAdvisorForm } from "../../interfaces/entities/contact.entity";
import { contactType } from "../../constants";

export function validateScheduleSurgeryForm(formdata: IScheduleSurgeryForm) {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'Full name is required',
            'any.required': 'Full name is required'
        }),
        mobile: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({
                'string.pattern.base': 'Please enter a valid mobile number',
                'string.empty': 'Mobile number is required',
                'any.required': 'Mobile number is required'
            }),
        code: Joi.string().required().messages({
            'string.empty': 'Code is required',
            'any.required': 'Code is required'
        }),
        city: Joi.string().required().messages({
            'string.empty': 'City is required',
            'any.required': 'City is required'
        }),
        disease: Joi.string().required().messages({
            'string.empty': 'Disease is required',
            'any.required': 'Disease is required'
        }),
    });
    return schema.validate(formdata);
}

export function validateTalkToInsuranceAdvisorForm(formdata: ITalkToInsuranceAdvisorForm) {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'Full name is required',
            'any.required': 'Full name is required'
        }),
        mobile: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({
                'string.pattern.base': 'Please enter a valid mobile number',
                'string.empty': 'Mobile number is required',
                'any.required': 'Mobile number is required'
            }),
        code: Joi.string().required().messages({
            'string.empty': 'Code is required',
            'any.required': 'Code is required'
        }),
        city: Joi.string().required().messages({
            'string.empty': 'City is required',
            'any.required': 'City is required'
        }),
        disease: Joi.string().required().messages({
            'string.empty': 'Disease is required',
            'any.required': 'Disease is required'
        }),
    });
    return schema.validate(formdata);
}

export function validateQuickEmiCheckForm(formdata: IQuickEmiCheckForm) {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'Full name is required',
            'any.required': 'Full name is required'
        }),
        mobile: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({
                'string.pattern.base': 'Please enter a valid mobile number',
                'string.empty': 'Mobile number is required',
                'any.required': 'Mobile number is required'
            }),
        code: Joi.string().required().messages({
            'string.empty': 'Code is required',
            'any.required': 'Code is required'
        }),
        city: Joi.string().required().messages({
            'string.empty': 'City is required',
            'any.required': 'City is required'
        }),
        disease: Joi.string().required().messages({
            'string.empty': 'Disease is required',
            'any.required': 'Disease is required'
        }),
        estimatedCost: Joi.number()
            .optional()
            .messages({
                "number.base": "Estimated cost must contain only numbers",
            }),

        tenure: Joi.number()
            .valid(3, 6, 9, 12, 18, 24)
            .optional()
            .messages({
                "any.only": "Please enter a valid tenure (3, 6, 9, or 12 months)",
                "number.base": "Tenure must be a valid number",
            }),
    });
    return schema.validate(formdata);
}

export function validateRequestCallbackForm(formdata: IRequestCallbackForm) {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'Full name is required',
            'any.required': 'Full name is required'
        }),
        mobile: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({
                'string.pattern.base': 'Please enter a valid mobile number',
                'string.empty': 'Mobile number is required',
                'any.required': 'Mobile number is required'
            }),
        code: Joi.string().required().messages({
            'string.empty': 'Code is required',
            'any.required': 'Code is required'
        }),
        city: Joi.string().required().messages({
            'string.empty': 'City is required',
            'any.required': 'City is required'
        }),
        helpType: Joi.string()
            .valid('Treatment', 'Surgery', 'Medicine', 'Other')
            .required()
            .messages({
                'any.only': 'Help type must be one of: Treatment, Surgery, Medicine, or Other',
                'string.empty': 'Help type is required',
                'any.required': 'Help type is required'
            }),
        message: Joi.string().required().messages({
            'string.empty': 'Message is required',
            'any.required': 'Message is required'
        })
    });
    return schema.validate(formdata);
}

export function validateQuickDoctorConnectForm(formdata: IQuickDoctorConnectForm) {
    const schema = Joi.object({
        doctorName: Joi.string().min(3).max(50).required().messages({
            'string.empty': 'Doctor name is required',
            "string.base": "Doctor name must be a string",
            'any.required': 'Doctor name is required',
            'string.min': 'Doctor name must be at least 3 characters long',
            'string.max': 'Doctor name must be at most 50 characters long'
        }),
        specialization: Joi.array()
            .items(Joi.string().trim())
            .min(1)
            .required()
            .messages({
                "array.base": "Specialization must be an array",
                "array.min": "Specialization is required",
                "any.required": "Specialization is required",
                "string.base": "Specialization must be an array of strings",
            }),
        code: Joi.string().valid(contactType.QUICK_DOCTOR_CONNECT).required().messages({
            'string.empty': 'Code is required',
            'any.required': 'Code is required'
        }),
        mail: Joi.string().required().messages({
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
        mobile: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({
                'string.pattern.base': 'Please enter a valid mobile number',
                'string.empty': 'Mobile number is required',
                'any.required': 'Mobile number is required',
            }),
        city: Joi.string().required().messages({
            'string.empty': 'City is required',
            'any.required': 'City is required'
        })
    });
    return schema.validate(formdata);
}