import express from "express";
import blogRoutes from "./blog.routes";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import { authMiddleware } from "../../middlewares";

const router = express.Router();

router.use("/blogs", blogRoutes);
router.use("/auth",  authRoutes);
router.use("/user",  userRoutes);

export default router;