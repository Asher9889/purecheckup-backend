import mongoose, { Document } from "mongoose";

interface IContact extends Document {
    name: string;
    code: string;
    mobile: string;
    city: string;
    disease: string;
    estimatedCost?: number;
    tenure?: number;
    helpType?: string;
}
const ContactSchema = new mongoose.Schema<IContact>({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
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

const Contact = mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
