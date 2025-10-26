import { NextFunction, Request, Response } from "express";
import { ApiErrorResponse, ApiSuccessResponse, sendAdminConsultationNotification, sendUserConsultationConfirmation, validateScheduleSurgeryForm } from "../utils";
import { SCHEDULE_SURGERY_RESPONSE } from "../constants/contact/contactApiResponse";
import { sendSurgeryScheduleEmailToAdmin } from "../utils/nodemailer/sendMail";
import { config } from "../config";
import { contactService } from "../services";

export async function scheduleSurgery(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const formdata = req.body;
        formdata.code = "SCHEDULE_SURGERY";
        const { error, value } = validateScheduleSurgeryForm(formdata);
        if (error) {
            throw new ApiErrorResponse(SCHEDULE_SURGERY_RESPONSE.VALIDATION_ERROR.statusCode, error.message);
        }

        await contactService.scheduleSurgery(value)
        
        // await sendUserConsultationConfirmation(value);

        return res.status(SCHEDULE_SURGERY_RESPONSE.SUCCESS.statusCode).json(new ApiSuccessResponse(SCHEDULE_SURGERY_RESPONSE.SUCCESS.statusCode, SCHEDULE_SURGERY_RESPONSE.SUCCESS.message))
    } catch (error: any) {
        console.error("Error sending mail:", error);
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        return next(new ApiErrorResponse(SCHEDULE_SURGERY_RESPONSE.SERVER_ERROR.statusCode, SCHEDULE_SURGERY_RESPONSE.SERVER_ERROR.message))
    }
}
