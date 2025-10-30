import express from "express";
import { contactController } from "../../controllers";

const router = express.Router();

router.post("/advisor", contactController.scheduleSurgery);
router.post("/insurance-advisor", contactController.talkToInsuranceAdvisor);
router.post("/quick-emi-check", contactController.quickEmiCheck);
// router.post("/login", authController.login);
// router.post("/refresh", authController.refresh);
// router.post("/logout", authController.logout);
// router.get("/me",  authController.me);
// router.post("/forget-password",  authController.forgetPassword);
// router.get("/", blogsController.getBlogs);
// router.get("/:id", blogsController.getBlog);
// router.put("/:id", upload.single("image"), blogsController.updateBlog);
// router.delete("/:id", blogsController.deleteBlog);


export default router;