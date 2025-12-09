import mongoose, { Document } from "mongoose";

interface IDoctorOnboard extends Document {
    name: string;
    email: string;
    mobile: string;
    city: string;
    specializations: string;
    degree: string[];
    expMbbs: number;
    expPg: number;
}

const DoctorOnboardSchema = new mongoose.Schema<IDoctorOnboard>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    specializations: {
        type: String,
        required: true,
    },
    degree: {
        type: [String],
        default: [],
    },
    expMbbs: {
        type: Number,
        required: true,
    },
    expPg: {
        type: Number,
    },
}, {
    timestamps: true
});

const DoctorOnboard = mongoose.model<IDoctorOnboard>("DoctorOnboard", DoctorOnboardSchema);

export default DoctorOnboard;
