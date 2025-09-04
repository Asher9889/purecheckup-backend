import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../interfaces";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { config } from "../config";

// Extend IUser with Mongoose Document
interface IMongoUser extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
}

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^\+?[0-9]{10,15}$/, // 10-digit phone
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    }
  },
  { timestamps: true }
);

// Pre-save hook
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await argon2.hash(this.password);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return argon2.verify(this.password, candidatePassword);
};

// Generate Access Token (short-lived)
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email }, 
    config.accessSecret as string,
    { expiresIn: "15m" } // 15 minutes
  );
};

// Generate Refresh Token (long-lived)
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email }, 
    config.refreshSecret as string,
    { expiresIn: "7d" } // 7 days
  );
};


const User = mongoose.model<IMongoUser>("User", userSchema);

export default User;
