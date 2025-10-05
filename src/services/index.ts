import { register, login, refresh, forgetPassword } from "./auth.service";
import { bookConditionConsultationService } from "./user.service";

const authService = {
    register, login, refresh, forgetPassword
}

const userPatientService = {
    bookConditionConsultationService
}

export { authService, userPatientService }