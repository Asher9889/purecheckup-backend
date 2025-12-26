import mongoose, { Schema, Document } from "mongoose";

export type EditorContent = {
  type: "doc";
  content: any[];
};


export interface IBlog extends Document {
  title: string;
  slug: string;
  summary: string;
  featuredImage?: string;
  author: string;
  content: EditorContent;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    featuredImage: { type: String },
    author: { type: String, required: true },
    content: {
      type: Schema.Types.Mixed, // or Object
      required: true,
    },
  },
  { timestamps: true }
);


const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
