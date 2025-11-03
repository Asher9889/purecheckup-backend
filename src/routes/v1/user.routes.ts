import express from "express";
import { authController, blogsController, userController  } from "../../controllers";

import { authMiddleware, validateUser, upload } from "../../middlewares";
import { validateConditionPatientSchema } from "../../utils/schema-validation/validateUser.schema";
import { validateConditionPatient } from "../../middlewares/validateUser.middleware";

const router = express.Router();

router.post("/book-appointment",  userController.bookFreeConsultation);
router.post("/condition/book-appointment",  upload.single("image"),  validateConditionPatient, userController.bookConditionConsultation );




// auth routes
router.post("/signup", authController.signUp);






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