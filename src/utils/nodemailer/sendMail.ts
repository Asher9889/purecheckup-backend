import nodemailer from "nodemailer";
import { config } from "../../config";
import { IBookConsultationForm, IConditionConsultationForm } from "../../interfaces";
import path from "path";
import fs from "fs";
import { IQuickDoctorConnectForm } from "../../interfaces/entities/contact.entity";

const transporter = nodemailer.createTransport({
  host: config.hostingerWebMailHost,
  port: config.hostingerWebMailPort, // 465 (SSL) or 587 (TLS)
  secure: config.hostingerWebMailPort === 465, // true for 465, false for 587
  auth: {
    user: config.hostingerWebMailUser,
    pass: config.hostingerWebMailPass,
  },
});


/**
 * Send notification to hospital/admin when a patient books consultation
 */

const formatField = (value: any, label: string, formatter?: (val: any) => string) => {
  if (value === undefined || value === null) return '';
  const displayValue = formatter ? formatter(value) : value;
  return `<li><strong>${label}:</strong> ${displayValue}</li>`;
};

async function sendAdminConsultationNotification(
  formdata: IBookConsultationForm | IConditionConsultationForm | any
): Promise<boolean> {
  try {
    const mailOptions:any = {
      from: `"PureCheckup" <${config.hostingerWebMailUser}>`,
      to: config.clientEmail,
      subject: "New Consultation Booking - PureCheckup",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #2C3E50;">📥 New Consultation Request</h2>
          <p>Hello Admin,</p>
          <p>A new consultation request has been submitted on <strong>PureCheckup</strong>.</p>
          <ul>
            ${formdata.fullName && formatField(formdata.fullName, 'Full Name')}
            ${formdata.mobileNumber && formatField(formdata.mobileNumber, 'Mobile Number')}
            ${formdata.isWhatsaapConnect !== undefined && formatField(
              formdata.isWhatsaapConnect ? 'Yes' : 'No', 
              'WhatsApp Consent'
            )}
            ${formdata.email && formatField(formdata.email, 'Email')}
            ${formdata.healthConcern && formatField(formdata.healthConcern, 'Health Concern')}
            ${(formdata.condition || formdata.mode) && formatField(
              formdata.condition || formdata.mode, 
              formdata.condition ? 'Condition' : 'Consultation Type'
            )}
            ${formdata.city && formatField(formdata.city, 'City')}
            ${formatField(
              new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }), 
              'Requested At'
            )}
          </ul>
          ${formdata.mode ? `<p><strong>Mode:</strong> ${formdata.mode}</p>` : ''}
          ${formdata.image ? `<p>An image was uploaded and attached to this email.</p>` : ''}
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">This is an automated message from PureCheckup.</p>
        </div>
      `,
    };

    // Attach uploaded image when available (expecting a file path on disk)
    if (formdata.image) {
      const imagePath = formdata.image;
      try {
        if (fs.existsSync(imagePath)) {
          mailOptions.attachments = [
            {
              filename: path.basename(imagePath),
              path: imagePath,
            },
          ];
        } else {
          console.warn("Uploaded image not found at path:", imagePath);
        }
      } catch (err) {
        console.warn("Error checking/attaching image:", err);
      }
    }

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Admin consultation notification sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending admin consultation notification:", err);
    return false;
  }
}

/**
 * Send confirmation email to the patient
 */
async function sendUserConsultationConfirmation(
  formdata: IBookConsultationForm
): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"PureCheckup" <${config.hostingerWebMailUser}>`,
      to: formdata.email,
      subject: "✅ Consultation Request Received - PureCheckup",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #27AE60;">✅ Your Consultation Request Has Been Received</h2>
          <p>Hi ${formdata.fullName},</p>
          <p>Thank you for booking your free consultation with <strong>PureCheckup</strong>. Our team will review your request and get back to you shortly.</p>
          <p><strong>Here are your submitted details:</strong></p>
          <ul>
            <li><strong>Mobile Number:</strong> ${formdata.mobileNumber}</li>
            <li><strong>Health Concern:</strong> ${formdata.healthConcern}</li>
            <li><strong>Treatment/Condition:</strong> ${formdata.condition}</li>
          </ul>
          <p style="margin-top: 20px;">📞 Our team will contact you on your provided number ${formdata.isWhatsaapConnect ? "(including WhatsApp)" : ""} soon.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">This is an automated email from PureCheckup. Please do not reply.</p>
        </div>
      `,
    });

    console.log("✅ User consultation confirmation sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending user consultation confirmation:", err);
    return false;
  }
}


/**
 * Send notification to admin when a user signs up
 */
async function sendAdminSignupNotification(
  clientEmail: string,
  newUserEmail: string
): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"PureCheckup" <${config.hostingerWebMailUser}>`,
      to: clientEmail,
      subject: "🔔 New User Signup Alert - PureCheckup",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #2C3E50;">🔔 New User Signup</h2>
          <p>Hello Admin,</p>
          <p>A new user has just registered on <strong>PureCheckup</strong>.</p>
          <p><strong>User Email:</strong> ${newUserEmail}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">This is an automated message from PureCheckup.</p>
        </div>
      `,
    });

    console.log("✅ Admin notification sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending admin notification:", err);
    return false;
  }
}

/**
 * Send welcome email to the user who just signed up
 */
async function sendUserWelcomeEmail(
  userEmail: string
): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"PureCheckup" <${config.hostingerWebMailUser}>`,
      to: userEmail,
      subject: "🎉 Welcome to PureCheckup!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #27AE60;">🎉 Welcome to PureCheckup!</h2>
          <p>Hi there,</p>
          <p>Thank you for signing up with <strong>PureCheckup</strong>. We’re excited to have you on board!</p>
          <p>With PureCheckup, you can easily manage your health checkups, track appointments, and stay connected with trusted healthcare providers.</p>
          <p style="margin-top: 20px;">👉 <a href="https://purecheckup.com" style="color: #27AE60; text-decoration: none; font-weight: bold;">Visit Your Dashboard</a></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">This is an automated welcome email from PureCheckup.</p>
        </div>
      `,
    });

    console.log("✅ User welcome email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending welcome email:", err);
    return false;
  }
}


async function sendForgetPasswordEmail(userEmail: string, resetUrl: string): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"TheLifeAstro" <${config.hostingerWebMailUser}>`,
      to: userEmail,
      subject: "🔐 Reset Your Password – TheLifeAstro",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4B0082;">🔐 Password Reset Request</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password for your <strong>TheLifeAstro</strong> account.</p>
          <p>If you made this request, click the button below to reset your password:</p>
          
          <p style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #4B0082; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">
              Reset Password
            </a>
          </p>

          <p>If you didn’t request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
          <p style="font-size: 12px; color: #888;">
            This link will expire in 1 hour. If you have any issues, please contact our support team.
            <br /><br />
            — TheLifeAstro Team
          </p>
        </div>
      `,
    });

    console.log("✅ Password reset email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending password reset email:", err);
    return false;
  }
}

async function sendSurgeryScheduleEmailToAdmin(
  adminEmail: string,
  patientData: {
    name: string;
    mobile: string;
    city: string;
    disease: string;
  }
): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"PureCheckup" <${config.hostingerWebMailUser}>`,
      to: adminEmail,
      subject: "🩺 New Surgery Schedule Request - PureCheckup",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007BFF;">New Surgery Schedule Request</h2>
          <p>Hello Admin,</p>
          <p>A new surgery consultation request has been submitted on <strong>PureCheckup</strong>.</p>
          
          <h3 style="color: #444;">Patient Details:</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Name:</strong> ${patientData.name}</li>
            <li><strong>Mobile:</strong> ${patientData.mobile}</li>
            <li><strong>City:</strong> ${patientData.city}</li>
            <li><strong>Treatment / Disease:</strong> ${patientData.disease}</li>
          </ul>

          <p style="margin-top: 20px;">
            Please reach out to the patient to confirm their appointment and assign the appropriate medical expert.
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
          <p style="font-size: 12px; color: #888;">
            This is an automated email from PureCheckup’s surgery scheduling system.<br/>
            — PureCheckup Admin Notification Service
          </p>
        </div>
      `,
    });

    console.log("✅ Surgery schedule email sent to admin:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending surgery schedule email:", err);
    return false;
  }
}

async function sendQuickEmiCheckEmailToAdmin(
  adminEmail: string,
  patientData: {
    name: string;
    mobile: string;
    city: string;
    disease: string;
    estimatedCost?: string;
    tenure?: string;
  }
): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"PureCheckup" <${config.hostingerWebMailUser}>`,
      to: adminEmail,
      subject: "🩺 New Surgery Schedule Request - PureCheckup",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007BFF;">New Surgery Schedule Request</h2>
          <p>Hello Admin,</p>
          <p>A new surgery consultation request has been submitted on <strong>PureCheckup</strong>.</p>
          
          <h3 style="color: #444;">Patient Details:</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Name:</strong> ${patientData.name}</li>
            <li><strong>Mobile:</strong> ${patientData.mobile}</li>
            <li><strong>City:</strong> ${patientData.city}</li>
            <li><strong>Treatment / Disease:</strong> ${patientData.disease}</li>
            <li><strong>Estimated Cost:</strong> ${patientData?.estimatedCost ? "₹" + patientData?.estimatedCost : "Not Provided"}</li>
            <li><strong>Tenure:</strong> ${patientData?.tenure ? patientData?.tenure + " Months" : "Not Provided"}</li>
          </ul>

          <p style="margin-top: 20px;">
            Please reach out to the patient to confirm their appointment and assign the appropriate medical expert.
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
          <p style="font-size: 12px; color: #888;">
            This is an automated email from PureCheckup’s surgery scheduling system.<br/>
            — PureCheckup Admin Notification Service
          </p>
        </div>
      `,
    });

    console.log("✅ Surgery schedule email sent to admin:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending surgery schedule email:", err);
    return false;
  }
}

async function sendRequestCallbackEmailToAdmin(
  adminEmail: string,
  patientData: {
    name: string;
    mobile: string;
    city: string;
    helpType: string;
    message: string;
  }
): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"PureCheckup" <${config.hostingerWebMailUser}>`,
      to: adminEmail,
      subject: "🩺 New Request for Callback - PureCheckup",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007BFF;">New Request for Callback</h2>
          <p>Hello Admin,</p>
          <p>A new request for callback has been submitted on <strong>PureCheckup</strong>.</p>
          
          <h3 style="color: #444;">Patient Details:</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Name:</strong> ${patientData.name}</li>
            <li><strong>Mobile:</strong> ${patientData.mobile}</li>
            <li><strong>City:</strong> ${patientData.city}</li>
            <li><strong>Help Type:</strong> ${patientData.helpType}</li>
            <li><strong>Message:</strong> ${patientData.message}</li>
          </ul>

          <p style="margin-top: 20px;">
            Please reach out to the patient to confirm their appointment and assign the appropriate medical expert.
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
          <p style="font-size: 12px; color: #888;">
            This is an automated email from PureCheckup’s request for callback system.<br/>
            — PureCheckup Admin Notification Service
          </p>
        </div>
      `,
    });

    console.log("✅ Request for callback email sent to admin:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending request for callback email:", err);
    return false;
  }
}

async function sendQuickDoctorConnectEmailToAdmin(adminEmail: string,
  data: IQuickDoctorConnectForm ){
  try {
    const info = await transporter.sendMail({
      from: `"PureCheckup" <${config.hostingerWebMailUser}>`,
      to: adminEmail,
      subject: "🩺 New Quick Doctor Connect Request - PureCheckup",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007BFF;">New Quick Doctor Connect Request</h2>
          <p>Hello Admin,</p>
          <p>A new quick doctor connect request has been submitted on <strong>PureCheckup</strong>.</p>
          
          <h3 style="color: #444;">Patient Details:</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Doctor Name:</strong> ${data.doctorName}</li>
            <li><strong>Mobile:</strong> ${data.mobile}</li>
            <li><strong>City:</strong> ${data.city}</li>
            <li><strong>Specialization:</strong> ${data.specialization}</li>
            <li><strong>Mail:</strong> ${data.mail}</li>
          </ul>

          <p style="margin-top: 20px;">
            Please reach out to the patient to confirm their appointment and assign the appropriate medical expert.
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
          <p style="font-size: 12px; color: #888;">
            This is an automated email from PureCheckup’s quick doctor connect system.<br/>
            — PureCheckup Admin Notification Service
          </p>
        </div>
      `,
    });

    console.log("✅ Quick doctor connect email sent to admin:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending quick doctor connect email:", err);
    return false;
  }
}


export { sendQuickDoctorConnectEmailToAdmin, sendAdminConsultationNotification, sendAdminSignupNotification, sendUserWelcomeEmail, sendUserConsultationConfirmation, sendForgetPasswordEmail, sendSurgeryScheduleEmailToAdmin, sendQuickEmiCheckEmailToAdmin, sendRequestCallbackEmailToAdmin }