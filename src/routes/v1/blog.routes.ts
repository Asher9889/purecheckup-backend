import express from "express";
import { blogsController } from "../../controllers";
import { upload } from "../../middlewares/index";

const router = express.Router();

router.post("/", upload.single("image"), blogsController.createblog);
router.get("/", blogsController.getBlogs);
router.get("/:id", blogsController.getBlog);
router.put("/:id", upload.single("image"), blogsController.updateBlog);
router.delete("/:id", blogsController.deleteBlog);


export default router;