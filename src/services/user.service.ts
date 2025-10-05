import { StatusCodes } from "http-status-codes";
import { IConditionConsultationForm } from "../interfaces";
import { Patient } from "../models";
import { ApiErrorResponse } from "../utils";

async function  bookConditionConsultationService(formdata: IConditionConsultationForm): Promise<boolean> {
    const patient = new Patient(formdata);
    const savedPatient = await patient.save();
    if(!savedPatient){
     throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Unable to create patient.")
    }

    
    return true; // Placeholder implementation
}

export { bookConditionConsultationService }