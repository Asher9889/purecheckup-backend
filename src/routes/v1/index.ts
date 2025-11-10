import express from "express";
import blogRoutes from "./blog.routes";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import contactRoutes from "./contact.routes";
import { authMiddleware } from "../../middlewares";
import raExpressMongoose from 'express-mongoose-ra-json-server';
import { Blog } from "../../models";


const router = express.Router();

router.use("/user", userRoutes);
router.use("/contact", contactRoutes);
router.use("/blogs", blogRoutes);

// router.use("/blogs", (req, res, next)=> {
//     if (typeof req.query.filter === "string") {
//       req.query.filter = JSON.parse(req.query.filter);
//     }
//     if (typeof req.query.range === "string") {
//       req.query.range = JSON.parse(req.query.range);
//     }
//     if (typeof req.query.sort === "string") {
//       req.query.sort = JSON.parse(req.query.sort);
//     }
//     console.log("Raw query:", req.url);
//     console.log("Parsed query:", req.query);
//     next()
// }, raExpressMongoose(Blog, {useLean: true}));

router.use("/auth", authRoutes);

export default router;