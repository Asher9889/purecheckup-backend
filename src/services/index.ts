import { register, login, refresh, forgetPassword } from "./auth.service";
import { bookConditionConsultationService } from "./user.service";
import { scheduleSurgery } from "./contact.service";

const authService = {
    register, login, refresh, forgetPassword
}

const userPatientService = {
    bookConditionConsultationService
}

const contactService = {
    scheduleSurgery
}

export { authService, userPatientService, contactService }