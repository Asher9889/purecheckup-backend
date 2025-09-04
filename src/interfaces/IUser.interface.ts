import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface IUser {
    fullName: string;
    email: string;
    phone: number;
    password: string
}

interface ILoginUser {
    email: string;
    password: string;
}


interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}

interface AuthRequest extends Request {
    user?: any; // you can make this a proper User type
}

interface IBookConsultationForm{
    fullName: string;
    mobileNumber: string;
    isWhatsaapConnect: boolean;
    email: string;
    healthConcern: string;
    condition: string;
}

export { IUser, ILoginUser, DecodedToken, AuthRequest, IBookConsultationForm };