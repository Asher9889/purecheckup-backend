import Joi from "joi";
import { IQuickEmiCheckForm, IScheduleSurgeryForm, ITalkToInsuranceAdvisorForm } from "../../interfaces/entities/contact.entity";

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
    console.log("data is", formdata)
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
