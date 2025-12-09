import { signUp, login, refresh, logout, me, forgetPassword } from "./auth.controller";
import { createblog, getBlogs, getBlog, updateBlog, deleteBlog } from "./blog.controller";
import { bookFreeConsultation, bookConditionConsultation } from "./user.controller";
import { quickDoctorConnect, scheduleSurgery, talkToInsuranceAdvisor, quickEmiCheck, requestCallback, onboardingDoctor } from "./contact.controller";
import { uploadImage } from "./upload.controller";

const blogsController = {
    createblog, getBlogs, getBlog, updateBlog, deleteBlog
}

const authController = {
    signUp, login, refresh, logout, me, forgetPassword
}

const userController = {
    bookFreeConsultation, bookConditionConsultation
}

const contactController = {
    quickDoctorConnect, scheduleSurgery, talkToInsuranceAdvisor, quickEmiCheck, requestCallback, onboardingDoctor
}

const uploadController = {
    uploadImage
}

export { blogsController, authController, userController, contactController, uploadController }