import dotenv from "dotenv";

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    mongoUser: string;
    mongoPassword: string;
    mongoHost: string;
    mongoPort: string;
    mongoAuthSource: string;
    mongoDBUrl?: string;
    dbName: string;
    accessSecret: string;
    refreshSecret: string;
    hostingerWebMailHost: string;
    hostingerWebMailPort: number;
    hostingerWebMailUser: string;
    hostingerWebMailPass: string
    clientEmail: string;

    // Super Admin Seeder
    superAdminEmail: string;
    superAdminPassword: string;
    superAdminPhone: string;
    superAdminFullName: string;

    // Cloudinary
    cloudinaryCloudName: string;
    cloudinaryApiKey: string;
    cloudinaryApiSecret: string;

    // N8N workflow
    n8nAppendToExcelWebhookUrl: string;
    n8nAppendToDoctorOnboarding: string;

}

const config: Config = {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV || "development",
    mongoUser: process.env.MONGO_USER || "",
    mongoPassword: process.env.MONGO_PASSWORD || "",
    mongoHost: process.env.MONGO_HOST || "localhost",
    mongoPort: process.env.MONGO_PORT || "27017",
    mongoAuthSource: process.env.MONGO_AUTHSOURCE || "admin",
    // Build URL dynamically if not provided directly
    dbName: process.env.MONGO_DBNAME || "",
    accessSecret: process.env.JWT_ACCESS_SECRET || "test",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "test",

    // Super Admin Seeder
    superAdminEmail: process.env.SUPER_ADMIN_EMAIL || "",
    superAdminPassword: process.env.SUPER_ADMIN_PASSWORD || "",
    superAdminPhone: process.env.SUPER_ADMIN_PHONE || "",
    superAdminFullName: process.env.SUPER_ADMIN_FULLNAME || "",

    // Hostinger
    hostingerWebMailHost: process.env.HOSTINGER_WEB_MAIL_HOST || "",
    hostingerWebMailPort: Number(process.env.HOSTINGER_WEB_MAIL_PORT) || 0,
    hostingerWebMailUser: process.env.HOSTINGER_WEB_MAIL_AUTH_USER || "",
    hostingerWebMailPass: process.env.HOSTINGER_WEB_MAIL_AUTH_PASS || "",

    // Client Email
    clientEmail: process.env.CLIENT_EMAIL || "",

    // Cloudinary
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",

    // N8N workflow
    n8nAppendToExcelWebhookUrl: process.env.N8N_APPEND_TO_EXCEL!!,
    n8nAppendToDoctorOnboarding: process.env.N8N_APPEND_TO_DOCTOR_ONBOARDING!!,

};

export default config;
