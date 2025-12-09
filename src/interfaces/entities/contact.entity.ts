export interface IScheduleSurgeryForm {
    name: string;
    mobile: string;
    city: string;
    disease: string;
}

export interface ITalkToInsuranceAdvisorForm {
    name: string;
    mobile: string;
    city: string;
    disease: string;
}

export interface IQuickEmiCheckForm {
    name: string;
    mobile: string;
    city: string;
    disease: string;
    estimatedCost: string;
    tenure: string;
}

export interface IRequestCallbackForm {
    name: string;
    mobile: string;
    city: string;
    helpType: string;
    message: string;
}

export interface IQuickDoctorConnectForm {
    doctorName: string;
    specialization: string[];
    mail: string;
    mobile: string;
    city: string;
}

export interface IDoctorOnboardForm {
    name: string;
    email: string;
    mobile: string;
    city: string;
    specializations: string;
    degree: string[];
    expMbbs: string;
    expPg: string;
}