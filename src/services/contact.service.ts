import { StatusCodes } from "http-status-codes";
import { config } from "../config";
import { SCHEDULE_SURGERY_RESPONSE } from "../constants/contact/contactApiResponse";
import { IScheduleSurgeryForm } from "../interfaces";
import { Contact } from "../models";
import { ApiErrorResponse } from "../utils";
import { sendSurgeryScheduleEmailToAdmin } from "../utils/nodemailer/sendMail";

async function scheduleSurgery(patientDetails: IScheduleSurgeryForm): Promise<void> {
    try {
        const patient = await Contact.create(patientDetails);
        if (!patient) {
            throw new ApiErrorResponse(SCHEDULE_SURGERY_RESPONSE.SERVER_ERROR.statusCode, SCHEDULE_SURGERY_RESPONSE.SERVER_ERROR.message)
        }

        const adminInformed = await sendSurgeryScheduleEmailToAdmin(config.clientEmail, patientDetails);

        if (!adminInformed) {
            throw new ApiErrorResponse(SCHEDULE_SURGERY_RESPONSE.SERVER_ERROR.statusCode, SCHEDULE_SURGERY_RESPONSE.SERVER_ERROR.message)
        }
    } catch (error:any) {
        if (error instanceof ApiErrorResponse) {
            throw error;
        }
        throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

export { scheduleSurgery }
