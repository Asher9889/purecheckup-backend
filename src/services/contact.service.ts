import { StatusCodes } from "http-status-codes";
import { config } from "../config";
import { QUICK_EMI_CHECK_RESPONSE, REQUEST_CALLBACK_RESPONSE, SCHEDULE_SURGERY_RESPONSE } from "../constants/contact/contactApiResponse";
import { IQuickEmiCheckForm, IRequestCallbackForm, IScheduleSurgeryForm, ITalkToInsuranceAdvisorForm } from "../interfaces";
import { Contact } from "../models";
import { ApiErrorResponse } from "../utils";
import { sendQuickEmiCheckEmailToAdmin, sendRequestCallbackEmailToAdmin, sendSurgeryScheduleEmailToAdmin } from "../utils/nodemailer/sendMail";

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

async function talkToInsuranceAdvisor(patientDetails: ITalkToInsuranceAdvisorForm): Promise<void> {
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

async function quickEmiCheck(patientDetails: IQuickEmiCheckForm): Promise<void> {
    try {
        const patient = await Contact.create(patientDetails);
        if (!patient) {
            throw new ApiErrorResponse(QUICK_EMI_CHECK_RESPONSE.SERVER_ERROR.statusCode, QUICK_EMI_CHECK_RESPONSE.SERVER_ERROR.message)
        }

        const adminInformed = await sendQuickEmiCheckEmailToAdmin(config.clientEmail, patientDetails);

        if (!adminInformed) {
            throw new ApiErrorResponse(QUICK_EMI_CHECK_RESPONSE.SERVER_ERROR.statusCode, QUICK_EMI_CHECK_RESPONSE.SERVER_ERROR.message)
        }
    } catch (error:any) {
        if (error instanceof ApiErrorResponse) {
            throw error;
        }
        throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

async function requestCallback(patientDetails: IRequestCallbackForm): Promise<void> {
    try {
        const patient = await Contact.create(patientDetails);
        if (!patient) {
            throw new ApiErrorResponse(REQUEST_CALLBACK_RESPONSE.SERVER_ERROR.statusCode, REQUEST_CALLBACK_RESPONSE.SERVER_ERROR.message)
        }

        const adminInformed = await sendRequestCallbackEmailToAdmin(config.clientEmail, patientDetails);

        if (!adminInformed) {
            throw new ApiErrorResponse(REQUEST_CALLBACK_RESPONSE.SERVER_ERROR.statusCode, REQUEST_CALLBACK_RESPONSE.SERVER_ERROR.message)
        }
    } catch (error:any) {
        if (error instanceof ApiErrorResponse) {
            throw error;
        }
        throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

export { scheduleSurgery, talkToInsuranceAdvisor, quickEmiCheck, requestCallback }
