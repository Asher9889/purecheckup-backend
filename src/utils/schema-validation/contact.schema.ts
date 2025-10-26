import Joi from "joi";
import { IScheduleSurgeryForm } from "../../interfaces/entities/contact.entity";

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