import axios from "axios";
import { config } from "../config";


import { contactType } from "../constants/common/constant";

export async function appendToExcel(data: any): Promise<void> {
    console.log("data is", data)
    try {
        switch (data.type || data.code) {
            case contactType.FREE_CONSULTATION:
                break;
                 
            case contactType.SCHEDULE_SURGERY:
                // Handle schedule surgery data
                data.fullName = data.name; 
                data.healthConcern = data.disease;
                break;
            case contactType.REQUEST_CALLBACK:
                data.fullName = data.name;
                data.mobileNumber = data.mobile;
                data.condition = data.message;
                break;
            case contactType.QUICK_EMI_CHECK:
                data.fullName = data.name;
                data.mobileNumber = data.mobile;
                data.healthConcern = data.disease;
                break;
            default:
                // Handle other contact types if needed
                break;
        }
        await axios.post(config.n8nAppendToExcelWebhookUrl, data);
    } catch (error) {
        console.error('Error appending to Excel:', error);
        throw error;
    }
}

