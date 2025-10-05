import { signUp, login, refresh, logout, me, forgetPassword } from "./auth.controller";
import { createblog, getBlogs, getBlog, updateBlog, deleteBlog } from "./blog.controller";
import { bookFreeConsultation, bookConditionConsultation} from "./user.controller";

const blogsController = {
    createblog, getBlogs, getBlog, updateBlog, deleteBlog
}

const authController = {
    signUp, login, refresh, logout, me, forgetPassword
}

const userController = {
    bookFreeConsultation, bookConditionConsultation
}
export { blogsController, authController, userController }