import { NextFunction, Request, Response } from "express";
import { ApiErrorResponse, ApiSuccessResponse, sendAdminConsultationNotification, sendUserConsultationConfirmation } from "../utils";
import { IBookConsultationForm, IConditionConsultationForm } from "../interfaces";
import { StatusCodes } from "http-status-codes";
import { userPatientService } from "../services";
import { validateConditionPatientSchema } from "../utils/schema-validation/validateUser.schema";

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

async function bookConditionConsultation(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        // multer stores uploaded file metadata on req.file when using upload.single('image')
        const file = (req as any).file;
        const formdata: IConditionConsultationForm = {
            ...req.body,
            // ensure required fields exist according to interface; image can be undefined
            image: file ? file.path || file.filename || file.originalname : undefined,
        } as IConditionConsultationForm;

        const patientBooked = await userPatientService.bookConditionConsultationService(formdata);
        if(!patientBooked){
            throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to book consultation")
        }

        const adminInformed = await sendAdminConsultationNotification(formdata as any);

        if (!adminInformed) {
            throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to send message to doctor")
        } 
        // if (formdata.email) {

        //     const userInformed = await sendUserConsultationConfirmation(formdata);
        // }
        // if(!userInformed){
        //     throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to send message to patient")
        // }
        return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, "Your consultation has been booked successfully! Our medical team will reach out to you shortly."))
    } catch (error: any) {
        console.error("Error sending mail:", error);
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        return next(new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}

export  { bookFreeConsultation, bookConditionConsultation };