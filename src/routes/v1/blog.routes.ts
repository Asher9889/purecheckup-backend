import express from "express";
import { blogsController } from "../../controllers";
import { authenticate, authMiddleware, authorize, upload } from "../../middlewares/index";

const router = express.Router();

// 🔓 Public routes
router.get("/", blogsController.getBlogs);
router.get("/:slug", blogsController.getBlog);



// 🔐 Admin-protected routes
router.post("/", 
    authMiddleware,
    // authenticate,
    //  authorize("blog", "create"), upload.single("image"), 
     blogsController.createblog);
router.put("/:slug",  
    authMiddleware,
    // authenticate, 
    // authorize("blog", "update"), 
    // upload.single("image"), 
    blogsController.updateBlog);
router.delete("/:id",authMiddleware, authenticate, authorize("blog", "delete"), blogsController.deleteBlog);


export default router;