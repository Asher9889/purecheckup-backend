import express from "express";
import { uploadController } from "../../controllers";
import { upload } from "../../middlewares";

const router = express.Router();

router.post("/image", upload.single("image"), uploadController.uploadImage);

export default router;
