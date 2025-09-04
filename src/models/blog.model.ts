import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  id: number;       // main numeric ID
  title: string;
  content: string;
  image?: string;
}

const blogSchema = new Schema<IBlog>(
  {
    id: { type: Number, required: true, unique: true, index: true }, // main id
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
