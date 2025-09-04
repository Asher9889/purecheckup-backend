import { NextFunction, Request, Response } from "express";
import { ApiErrorResponse, ApiSuccessResponse, sendAdminConsultationNotification, sendUserConsultationConfirmation } from "../utils";
import { config } from "../config";
import { IBookConsultationForm } from "../interfaces";
import { StatusCodes } from "http-status-codes";

async function bookFreeConsultation(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const formdata: IBookConsultationForm = req.body;

        const adminInformed = await sendAdminConsultationNotification(formdata);

        if (!adminInformed) {
            throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to send message to doctor")
        }
        if (formdata.email) {

            const userInformed = await sendUserConsultationConfirmation(formdata);
        }
        // if(!userInformed){
        //     throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to send message to patient")
        // }
        res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, "Your consultation has been booked successfully! Our medical team will reach out to you shortly."))
    } catch (error: any) {
        console.error("Error sending mail:", error);
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        return next(new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}

export default bookFreeConsultation;