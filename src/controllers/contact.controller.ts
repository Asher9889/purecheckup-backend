import { NextFunction, Request, Response } from "express";
import { ApiErrorResponse, ApiSuccessResponse, validateQuickEmiCheckForm, validateScheduleSurgeryForm, validateTalkToInsuranceAdvisorForm } from "../utils";
import { QUICK_DOCTOR_CONNECT_RESPONSE, QUICK_EMI_CHECK_RESPONSE, REQUEST_CALLBACK_RESPONSE, SCHEDULE_SURGERY_RESPONSE, TALK_TO_INSURANCE_ADVISOR_RESPONSE } from "../constants/contact/contactApiResponse";
import { contactService } from "../services";
import { contactType } from "../constants";
import { validateQuickDoctorConnectForm, validateRequestCallbackForm } from "../utils/schema-validation/contact.schema";

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
        return next(new ApiErrorResponse(SCHEDULE_SURGERY_RESPONSE.SERVER_ERROR.statusCode, error.message))
    }
}

export async function talkToInsuranceAdvisor(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const formdata = req.body;
        formdata.code = contactType.TALK_TO_INSURANCE_ADVISOR;
        const { error, value } = validateTalkToInsuranceAdvisorForm(formdata);
        if (error) {
            throw new ApiErrorResponse(TALK_TO_INSURANCE_ADVISOR_RESPONSE.VALIDATION_ERROR.statusCode, error.message);
        }

        await contactService.talkToInsuranceAdvisor(value)
        
        // await sendUserConsultationConfirmation(value);

        return res.status(SCHEDULE_SURGERY_RESPONSE.SUCCESS.statusCode).json(new ApiSuccessResponse(SCHEDULE_SURGERY_RESPONSE.SUCCESS.statusCode, SCHEDULE_SURGERY_RESPONSE.SUCCESS.message))
    } catch (error: any) {
        console.error("Error sending mail:", error);
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        return next(new ApiErrorResponse(SCHEDULE_SURGERY_RESPONSE.SERVER_ERROR.statusCode, error.message))
    }
}

export async function quickEmiCheck(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const formdata = req.body;
        formdata.code = contactType.QUICK_EMI_CHECK;
        const { error, value } = validateQuickEmiCheckForm(formdata);
        if (error) {
            throw new ApiErrorResponse(QUICK_EMI_CHECK_RESPONSE.VALIDATION_ERROR.statusCode, error.message);
        }

        await contactService.quickEmiCheck(value)
        
        // await sendUserConsultationConfirmation(value);

        return res.status(QUICK_EMI_CHECK_RESPONSE.SUCCESS.statusCode).json(new ApiSuccessResponse(QUICK_EMI_CHECK_RESPONSE.SUCCESS.statusCode, QUICK_EMI_CHECK_RESPONSE.SUCCESS.message))
    } catch (error: any) {
        console.error("Error sending mail:", error);
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        return next(new ApiErrorResponse(QUICK_EMI_CHECK_RESPONSE.SERVER_ERROR.statusCode, error.message))
    } 
}

export async function requestCallback(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const formdata = req.body;
        formdata.code = contactType.REQUEST_CALLBACK;
        const { error, value } = validateRequestCallbackForm(formdata);
        if (error) {
            throw new ApiErrorResponse(REQUEST_CALLBACK_RESPONSE.VALIDATION_ERROR.statusCode, error.message);
        }
        await contactService.requestCallback(value)
        // await sendUserConsultationConfirmation(value);
        return res.status(REQUEST_CALLBACK_RESPONSE.SUCCESS.statusCode).json(new ApiSuccessResponse(REQUEST_CALLBACK_RESPONSE.SUCCESS.statusCode, REQUEST_CALLBACK_RESPONSE.SUCCESS.message))
    } catch (error: any) {
        console.error("Error sending mail:", error);
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        return next(new ApiErrorResponse(REQUEST_CALLBACK_RESPONSE.SERVER_ERROR.statusCode, error.message))
    } 
}

export async function quickDoctorConnect(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const formdata = req.body;
        formdata.code = contactType.QUICK_DOCTOR_CONNECT;
        const { error, value } = validateQuickDoctorConnectForm(formdata);
        if (error) {
            throw new ApiErrorResponse(QUICK_DOCTOR_CONNECT_RESPONSE.VALIDATION_ERROR.statusCode, error.message);
        }
        await contactService.quickDoctorConnect(value)
        // await sendUserConsultationConfirmation(value);
        return res.status(QUICK_DOCTOR_CONNECT_RESPONSE.SUCCESS.statusCode).json(new ApiSuccessResponse(QUICK_DOCTOR_CONNECT_RESPONSE.SUCCESS.statusCode, QUICK_DOCTOR_CONNECT_RESPONSE.SUCCESS.message))
    } catch (error: any) {
        console.error("Error sending mail:", error);
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        return next(new ApiErrorResponse(QUICK_DOCTOR_CONNECT_RESPONSE.SERVER_ERROR.statusCode, error.message))
    } 
}
        