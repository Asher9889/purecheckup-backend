import { StatusCodes } from "http-status-codes";
import { config } from "../../config";
import { Role, User } from "../../models";
import { ApiErrorResponse } from "../../utils";


export async function seedSuperAdmin() {
  try {
    const email = config.superAdminEmail;
    const password = config.superAdminPassword;
    const phone = config.superAdminPhone;
  
    if (!email || !password || !phone) {
      throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, "SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD must be set in .env");
    }
  
    // Find the SUPER_ADMIN role first
    const role = await Role.findOne({ role: "SUPER_ADMIN" });
    if (!role) {
      throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, "SUPER_ADMIN role not found. Seed roles first!");
    }
  
    // Check if super admin already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, "Super Admin already exists");
    }
  
    const newAdmin = new User({
      fullName: "System Super Admin",
      email,
      phone,
      password,
      roleId: role._id,
    });
  
    const savedAdmin = await newAdmin.save();
    if(!savedAdmin){
      throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, "Super Admin creation failed. Try Again");
    }
    console.log(`✅ Super Admin created: ${email}`);
  } catch (error:any) {
    if(error instanceof ApiErrorResponse){
      throw error;
    }
    throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
}

export default seedSuperAdmin;
