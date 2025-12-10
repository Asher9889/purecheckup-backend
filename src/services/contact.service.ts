import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { config } from "../config";
import { ONBOARDING_DOCTOR_RESPONSE, QUICK_DOCTOR_CONNECT_RESPONSE, QUICK_EMI_CHECK_RESPONSE, REQUEST_CALLBACK_RESPONSE, SCHEDULE_SURGERY_RESPONSE } from "../constants/contact/contactApiResponse";
import { IQuickEmiCheckForm, IRequestCallbackForm, IScheduleSurgeryForm, ITalkToInsuranceAdvisorForm } from "../interfaces";
import { Contact, DoctorOnboard } from "../models";
import { ApiErrorResponse } from "../utils";
import { sendOnboardingDoctorConfirmationEmail, sendOnboardingDoctorEmailToAdmin, sendQuickDoctorConnectEmailToAdmin, sendQuickEmiCheckEmailToAdmin, sendRequestCallbackEmailToAdmin, sendSurgeryScheduleEmailToAdmin } from "../utils/nodemailer/sendMail";
import { IDoctorOnboardForm, IQuickDoctorConnectForm } from "../interfaces/entities/contact.entity";
import { n8nWorkflows } from "../n8n";

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

        await n8nWorkflows.appendToExcel(patientDetails);
    } catch (error: any) {
        console.error("error inside scheduleSurgery service:", error)
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
        await n8nWorkflows.appendToExcel(patientDetails);
    } catch (error: any) {
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
        await n8nWorkflows.appendToExcel(patientDetails);
    } catch (error: any) {
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
        await n8nWorkflows.appendToExcel(patientDetails);
    } catch (error: any) {
        if (error instanceof ApiErrorResponse) {
            throw error;
        }
        throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

async function quickDoctorConnect(details: IQuickDoctorConnectForm): Promise<void> {
    try {
        const patient = await Contact.create(details);
        if (!patient) {
            throw new ApiErrorResponse(QUICK_DOCTOR_CONNECT_RESPONSE.SERVER_ERROR.statusCode, QUICK_DOCTOR_CONNECT_RESPONSE.SERVER_ERROR.message)
        }

        const adminInformed = await sendQuickDoctorConnectEmailToAdmin(config.clientEmail, details);

        if (!adminInformed) {
            throw new ApiErrorResponse(QUICK_DOCTOR_CONNECT_RESPONSE.SERVER_ERROR.statusCode, QUICK_DOCTOR_CONNECT_RESPONSE.SERVER_ERROR.message)
        }
        await axios.post(config.n8nAppendToExcelWebhookUrl, details);
    } catch (error: any) {
        if (error instanceof ApiErrorResponse) {
            throw error;
        }
        throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}



async function onboardingDoctor(details: IDoctorOnboardForm): Promise<void> {
    try {
        const doctor = await DoctorOnboard.create(details);
        if (!doctor) {
            throw new ApiErrorResponse(ONBOARDING_DOCTOR_RESPONSE.SERVER_ERROR.statusCode, ONBOARDING_DOCTOR_RESPONSE.SERVER_ERROR.message)
        }

        const adminInformed = await sendOnboardingDoctorEmailToAdmin(config.clientEmail, details);
        if (!adminInformed) {
            throw new ApiErrorResponse(ONBOARDING_DOCTOR_RESPONSE.SERVER_ERROR.statusCode, ONBOARDING_DOCTOR_RESPONSE.SERVER_ERROR.message)
        }
        await sendOnboardingDoctorConfirmationEmail(details.email, details.name);
        await axios.post(config.n8nAppendToDoctorOnboarding, details);
    } catch (error: any) {
        if (error instanceof ApiErrorResponse) {
            throw error;
        }
        throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

export { quickDoctorConnect, scheduleSurgery, talkToInsuranceAdvisor, quickEmiCheck, requestCallback, onboardingDoctor }
