import { register, login, refresh, forgetPassword } from "./auth.service";
import { bookConditionConsultationService } from "./user.service";
import { quickDoctorConnect, scheduleSurgery, talkToInsuranceAdvisor, quickEmiCheck, requestCallback } from "./contact.service";

const authService = {
    register, login, refresh, forgetPassword
}

const userPatientService = {
    bookConditionConsultationService
}

const contactService = {
    quickDoctorConnect, scheduleSurgery, talkToInsuranceAdvisor, quickEmiCheck, requestCallback,
}

export { authService, userPatientService, contactService }