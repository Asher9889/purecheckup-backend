import { Request, Response, NextFunction } from "express";
import { ApiErrorResponse } from "../index";
import { StatusCodes } from "http-status-codes";

function globalErrorHandler(err:any, req:Request, res:Response, next:NextFunction):Response {
    if(err instanceof ApiErrorResponse){
        console.log(err)
        const statusCode = err.statusCode;
        const message = err.message || "Internal Server Error";
        const data = err.data;
        const stack = err.stack;
        return res.status(statusCode).json(new ApiErrorResponse(statusCode, message, data, stack));
    }else{
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message || "Internal Server Error", null));
    }
}

export default globalErrorHandler;