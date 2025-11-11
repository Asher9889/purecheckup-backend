import { Request, Response, NextFunction } from "express";
import { getOptimizedUrl, uploadImageFromFile } from "../utils/cloudinary/upload";
import fs from "fs/promises";
import { StatusCodes } from "http-status-codes";
import { ApiErrorResponse } from "../utils";


async function uploadImage(req:Request, res:Response, next:NextFunction):Promise<Response | void>{
    const { file } = req;
    try {
       if (!file) {
           return res.status(StatusCodes.BAD_REQUEST).json(new ApiErrorResponse(StatusCodes.BAD_REQUEST, "No file uploaded" ));
       }
       const { publicId } = await uploadImageFromFile(file.path, {folder: "purecheckup/blogs"});
       const uploadedUrl = await getOptimizedUrl(publicId);
       await fs.unlink(file.path);

       return res.json({ url: uploadedUrl, publicId });
    } catch (error:any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
}

export { uploadImage }
