import Joi from "joi";
import { IBlog } from "../../models/blog.model";
import { ApiErrorResponse } from "..";
import { StatusCodes } from "http-status-codes";

const blogSchema = Joi.object({
  title: Joi.string().min(4).max(120).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title is required",
    "string.min": "Title must be at least 4 characters",
    "any.required": "Title is required",
  }),

  slug: Joi.string()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .required()
    .messages({
      "string.pattern.base":
        "Slug can only contain lowercase letters, numbers, and hyphens",
      "any.required": "Slug is required",
    }),

  summary: Joi.string().min(10).required().messages({
    "string.empty": "Summary is required",
    "string.min": "Summary must be at least 10 characters",
    "any.required": "Summary is required",
  }),

  content: Joi.string().min(10).required().messages({
    "string.min": "Content must be at least 10 characters long",
    "any.required": "Content is required",
  }),

  featuredImage: Joi.string()
    .uri()
    .optional()
    .messages({
      "string.uri": "Image must be a valid URL",
    }),

  author: Joi.string().min(2).max(60).required().messages({
    "string.empty": "Author name is required",
  }),


})
  // .unknown(false); // ❌ disallow extra properties


export function validateBlogSchema(data: IBlog) {
  const { error, value } = blogSchema.validate(data);
  if(error){
    throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, error.details[0].message);
  }
  return value;
}


