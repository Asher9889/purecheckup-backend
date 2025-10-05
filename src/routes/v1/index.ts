import express from "express";
import blogRoutes from "./blog.routes";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import { authMiddleware } from "../../middlewares";

const router = express.Router();

router.use("/user",  userRoutes);
router.use("/blogs", blogRoutes);
router.use("/auth",  authRoutes);

export default router;