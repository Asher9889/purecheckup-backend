module.exports = {
  apps : [{
    name: "purecheckup-server",
    script: "server.js",
    env: {
      NODE_ENV: "development",
     PORT: 3005,
      CLIENT_EMAIL: "avinandankumar154@gmail.com",
      HOSTINGER_WEB_MAIL_HOST: "smtp.hostinger.com",
      HOSTINGER_WEB_MAIL_PORT: 465,
      HOSTINGER_WEB_MAIL_AUTH_USER: "health@purecheckup.com",
      HOSTINGER_WEB_MAIL_AUTH_PASS: "pureCheckUp@9889",

      MONGO_USER: "pureCheckUp",
      MONGO_PASSWORD: "pureCheckUp%409889",
      MONGO_HOST: "72.60.96.238",
      MONGO_PORT: "27017",
      MONGO_DBNAME: "pureCheckUp_db",
      MONGO_AUTHSOURCE: "admin",

      SUPER_ADMIN_EMAIL: "health@yopmail.com",
      SUPER_ADMIN_PASSWORD: "Test@123",
      SUPER_ADMIN_PHONE: "9889840089",
      SUPER_ADMIN_FULL_NAME: "Saurabh Kushwaha",

      // Refresh & Access Token
      JWT_ACCESS_SECRET: "IAmSaurabhKushwaha",
      JWT_REFRESH_SECRET: "ItIsForTheLifeAstro",

      // Cloudinary
      CLOUDINARY_CLOUD_NAME: "diysz4uur",
      CLOUDINARY_API_KEY: "238479945428392",
      CLOUDINARY_API_SECRET: "4E89arEyiIFpW8a_R7sXhupxpxo",

      // n8n webhook URL
      N8N_APPEND_TO_EXCEL: "https://n8n.startechnoplast.com/webhook/contact"
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 3005,
      CLIENT_EMAIL: "avinandankumar154@gmail.com",
      HOSTINGER_WEB_MAIL_HOST: "smtp.hostinger.com",
      HOSTINGER_WEB_MAIL_PORT: 465,
      HOSTINGER_WEB_MAIL_AUTH_USER: "health@purecheckup.com",
      HOSTINGER_WEB_MAIL_AUTH_PASS: "pureCheckUp@9889",

      MONGO_USER: "pureCheckUp",
      MONGO_PASSWORD: "pureCheckUp%409889",
      MONGO_HOST: "72.60.96.238",
      MONGO_PORT: "27017",
      MONGO_DBNAME: "pureCheckUp_db",
      MONGO_AUTHSOURCE: "admin",

      SUPER_ADMIN_EMAIL: "health@yopmail.com",
      SUPER_ADMIN_PASSWORD: "Test@123",
      SUPER_ADMIN_PHONE: "9889840089",
      SUPER_ADMIN_FULL_NAME: "Saurabh Kushwaha",

      // Refresh & Access Token
      JWT_ACCESS_SECRET: "IAmSaurabhKushwaha",
      JWT_REFRESH_SECRET: "ItIsForTheLifeAstro",

      // Cloudinary
      CLOUDINARY_CLOUD_NAME: "diysz4uur",
      CLOUDINARY_API_KEY: "238479945428392",
      CLOUDINARY_API_SECRET: "4E89arEyiIFpW8a_R7sXhupxpxo",
      // n8n webhook URL
      N8N_APPEND_TO_EXCEL: "https://n8n.startechnoplast.com/webhook/contact"
    }
  }]
}
