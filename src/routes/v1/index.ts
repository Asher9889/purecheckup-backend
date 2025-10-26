import express from "express";
import blogRoutes from "./blog.routes";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import contactRoutes from "./contact.routes";
import { authMiddleware } from "../../middlewares";

const router = express.Router();

router.use("/user",  userRoutes);
router.use("/contact", contactRoutes);
router.use("/blogs", blogRoutes);
router.use("/auth",  authRoutes);

export default router;