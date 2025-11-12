import express from "express";
import { blogsController } from "../../controllers";
import { authenticate, authorize, upload } from "../../middlewares/index";

const router = express.Router();

// 🔓 Public routes
router.get("/", blogsController.getBlogs);
router.get("/:slug", blogsController.getBlog);



// 🔐 Admin-protected routes
router.post("/", 
    // authenticate,
    //  authorize("blog", "create"), upload.single("image"), 
     blogsController.createblog);
router.put("/:id", authenticate, authorize("blog", "update"), upload.single("image"), blogsController.updateBlog);
router.delete("/:id", authenticate, authorize("blog", "delete"), blogsController.deleteBlog);


export default router;