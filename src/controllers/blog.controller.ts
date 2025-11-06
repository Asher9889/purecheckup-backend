import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Blog } from "../models";
import { ApiErrorResponse, ApiSuccessResponse, blogResponse } from "../utils";

async function createblog(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, "Title and Content mandatory.")
    }
    // Find the last blog's ID
    const lastBlog = await Blog.findOne({}, {_id: 0, __v: 0}).sort({ id: -1 }).exec();
    const newId = lastBlog ? lastBlog.id + 1 : 1;

    // multer adds `file` to req
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const blog = await Blog.create({
      id: newId,
      title,
      content,
      image: imageUrl,
    });

    return res.status(StatusCodes.CREATED).json(new ApiSuccessResponse(StatusCodes.CREATED, blogResponse.created, blog));
  } catch (error:any) {
    console.error("Error creating blog:", error);
    if (error instanceof ApiErrorResponse){
      next(error);
    }
    return next(new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

// GET /blogs?filter={} & range=[0,9] & sort=["id","ASC"]
//========== Get all blogs===========>
async function getBlogs(req: Request, res: Response, next: NextFunction) {
  try {
    // Parse query params from react-admin
    const { range, sort, filter } = req.query;

    // Default pagination values
    let start = 0;
    let end = 9;

    if (range) {
      try {
        const parsedRange = JSON.parse(range as string);
        start = parsedRange[0];
        end = parsedRange[1];
      } catch (err) {
        console.warn("Invalid range format, using defaults");
      }
    }

    // Default sort values
    let sortField = "id";
    let sortOrder: 1 | -1 = 1;

    if (sort) {
      try {
        const parsedSort = JSON.parse(sort as string);
        sortField = parsedSort[0];
        sortOrder = parsedSort[1] === "DESC" ? -1 : 1;
      } catch (err) {
        console.warn("Invalid sort format, using defaults");
      }
    }

    // Default filter
    let parsedFilter: any = {};
    if (filter) {
      try {
        parsedFilter = JSON.parse(filter as string);
      } catch (err) {
        console.warn("Invalid filter format, ignoring");
      }
    }

    // Count total
    const total = await Blog.countDocuments(parsedFilter);

    // Get paginated, sorted data
    const blogs = await Blog.find(parsedFilter, {_id: 0, __v: 0})
      .sort({ [sortField]: sortOrder })
      .skip(start)
      .limit(end - start + 1)
      .lean();

    // Fix image URL duplication if any
    const fixedBlogs = blogs.map((blog) => ({
      ...blog,
      image: blog.image
        ? blog.image.startsWith("http")
          ? blog.image.replace(/(http:\/\/localhost:3005){2}/, "http://localhost:3005")
          : `${req.protocol}://${req.get("host")}${blog.image}`
        : null,
    }));

    // Set required React-Admin headers
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", `blogs ${start}-${start + fixedBlogs.length - 1}/${total}`);

    return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, blogResponse.fetched, fixedBlogs, total));
  } catch (error:any) {
    console.error("Error fetching blog:", error);
    if (error instanceof ApiErrorResponse){
      next(error);
    }
    return next(new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
  }
}

//========== Get single blog===========>
async function getBlog(req: Request, res: Response, next: NextFunction){
 try {
   const { id } = req.params;
   console.log("req.params", req.params)
 
   if(!id){
     throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, blogResponse.idRequired)
   }
   const blog = await Blog.findOne({id: id}, {_id: 0, __v: 0}).exec();
   if(!blog?.id){
     throw new ApiErrorResponse(StatusCodes.NOT_FOUND, blogResponse.notExists);
   } 
   return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, blogResponse.fetched, blog, 1));
 } catch (error: any) {
     console.error("Error fetching blog:", error);
    if (error instanceof ApiErrorResponse){
      next(error);
    }
    return next(new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
 }
}

//========== update one blog===========>
async function updateBlog(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, blogResponse.idRequired);
    }

    // If you're sending multipart/form-data (for image uploads)
    let updateData: any = { ...req.body };

    // If image uploaded, save path
    if (req.file) {
      updateData.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { id: Number(id) }, // match your custom id field, not _id
      updateData,
      { new: true, projection: { _id: 0, __v: 0 } }
    ).exec();

    if (!updatedBlog) {
      throw new ApiErrorResponse(StatusCodes.NOT_FOUND, blogResponse.notExists);
    }

    return res.json(
      new ApiSuccessResponse(StatusCodes.OK, blogResponse.updated, updatedBlog, 1)
    );

  } catch (error: any) {
    if (error instanceof ApiErrorResponse) {
      return next(error);
    }
    return next(new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
  }
}

//========== Delete one blog ===========>
async function deleteBlog(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, blogResponse.idRequired);
    }

    const deletedBlog = await Blog.findOneAndDelete({ id: Number(id) }).exec();

    if (!deletedBlog) {
      throw new ApiErrorResponse(StatusCodes.NOT_FOUND, blogResponse.notExists);
    }

    return res.json(
      new ApiSuccessResponse(StatusCodes.OK, blogResponse.deleted, deletedBlog, 1)
    );

  } catch (error: any) {
    if (error instanceof ApiErrorResponse) {
      return next(error);
    }
    return next(new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
  }
}
export { createblog, getBlogs, getBlog, updateBlog, deleteBlog };