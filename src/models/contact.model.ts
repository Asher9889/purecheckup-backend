import mongoose, { Document } from "mongoose";
import { ApiErrorResponse } from "../utils";
import { StatusCodes } from "http-status-codes";

interface IContact extends Document {
    name: string;
    doctorName: string;
    code: string;
    mobile: string;
    city: string;
    disease: string;
    estimatedCost?: number;
    tenure?: number;
    helpType?: string;
    specialization?: string[];
    mail?: string;
    

}
const ContactSchema = new mongoose.Schema<IContact>({
    name: {
        type: String,
    },
    doctorName: {
        type: String,
    },
    code: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    mail: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    disease: {
        type: String,
    },
    estimatedCost: {
        type: Number,
    },
    tenure: {
        type: Number,
    },
    helpType: {
        type: String,
    }
}, {
    timestamps: true
});

ContactSchema.pre("validate", function (next) {
    if (!this.name && !this.doctorName) {
    return next(new ApiErrorResponse(StatusCodes.BAD_REQUEST, "Either name or doctorName is required"));
  }
  next();
})
const Contact = mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
