import { IReqUser } from "../interfaces";

declare global {
  namespace Express {
    export interface Request {
      user?: IReqUser; // make it optional if it may not exist
    }
  }
}
