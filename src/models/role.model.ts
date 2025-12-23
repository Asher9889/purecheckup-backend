import mongoose, {  Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  role: string;
  description?: string;
  permissions: string[]; // permission slugs like ['blog:create', 'blog:update']
  isSystemRole: boolean; // prevents accidental deletion
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new mongoose.Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      trim: true, // e.g. "SUPER_ADMIN"
    },
    role: {type: String, required: true, unique: true},
    description: { type: String },
    permissions: [{ type: String, trim: true }],
    isSystemRole: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Role = mongoose.model<IRole>("Role", roleSchema);

export default Role;
