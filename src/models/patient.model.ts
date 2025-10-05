import mongoose, { Document, Schema } from "mongoose";
import { IConditionConsultationForm } from "../interfaces";

export interface IPatient extends IConditionConsultationForm, Document {}

const patientSchema = new Schema<IPatient>(
  {
    fullName: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true, enum: ["online", "clinic"] }, // e.g. 'online' | 'offline'
    image: { type: String }, // path to uploaded image (optional)
  },
  { timestamps: true }
);

const Patient = mongoose.model<IPatient>("Patient", patientSchema);

export default Patient;
