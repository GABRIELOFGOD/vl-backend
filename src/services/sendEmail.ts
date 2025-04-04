import * as nodemailer from "nodemailer";
import { EMAIL_SERVICE, GOOGLE_EMAIL_AUTH } from "../config/env";
import { Application } from "../entities/application.entity";
import { MailSenderProp } from "../types/mailSenderTypes";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(){
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aletechglobal@gmail.com',
        pass: GOOGLE_EMAIL_AUTH
      }
    });
  }

  sendEmail = async ({title, to, message}: MailSenderProp) => {
    await this.transporter.sendMail({
      from: EMAIL_SERVICE,
      to: to,
      subject: title,
      html: message
    });
  }

  sendAdminRegisterEmail = async (user: { email: string, name: string }) => {

    const message = `
      <html>
        <body>
          <p>The whole team of Verse of Light welcome you as an administrator ${user.name}<br> 
          We trust you with the affairs of the website and administration of the applicants in our subsequest competitions, keep up we hope to see you do exploit in our community</p>
        </body>
      </html>
    `
    await this.sendEmail({
      title: `Welcome ${user.name}`,
      to: user.email,
      message
    });
    
  }

  applicationMail = async (application: Application) => {
    const message = `
      <html>
        <body>
          <p>Dear ${application.fname}</p>
          <p>Thank you for applying for verse of light Quranic competiton, your application as been received and will be reveiwed duly, Please stay glued to your email as we will communicate the progress in your application to you through your email<br>
          <br>
          A unique Application as be assigned to you, use this id to complete your application by uploading the video of the surah assigned to you. <b>ApplicationID: <span class="color: blue; font-size: 30px">${application.applicationId}</span></b><br> 
          <br>
          Click <a href="https://versesoflight/continue?applicationId=${application.applicationId}">Here</a> to continue with your application or copy this link and paste on your browser https://versesoflight/continue?applicationId=${application.applicationId} <br>
          Please go through our FAQs for the answer to your questions, and if you have further question, please reach out to us. Thank you.</p>
        </body>
      </html>
    `

    await this.sendEmail({
      title: "Application successful",
      to: application.email,
      message
    });
  }

  videoUploaded = async (application: Application) => {
    const message = `
      <html>
        <body>
          <p>Dear ${application.fname}</p>
          <p>Thank you for applying for verse of light Quranic competiton, your application as been received and will be reveiwed duly, Please stay glued to your email as we will communicate the progress in your application to you through your email<br>
          <br>
          Your surah recitation video has been received and will as well be reviewed duly. Please note that selection will be done without favouritism, we will inform you what next via email, thank you.
        </body>
      </html>
    `

    await this.sendEmail({
      title: "Surah video uploaded",
      to: application.email,
      message
    });
  };

  sendProfilePhotoRejectionMail = async (application: Application, reason: string) => {
    const message = `
      <html>
        <body>
          <p>Dear ${application.fname}</p>
          <p>We are so sorry to inform you that the passport you uploaded during your application for the competition has been rejected due to the following reason:<br> 
          ${reason} <br>
          Please re-upload your image again as soon as possible so you won't be screened out of the competition</p>
        </body>
      </html>
    `

    await this.sendEmail({
      title: "Passport upload rejected",
      to: application.email,
      message
    });
  }

  sendBirthCertificateRejectionMail = async (application: Application, reason: string) => {
    const message = `
      <html>
        <body>
          <p>Dear ${application.fname}</p>
          <p>We are so sorry to inform you that the Birth Certificate you uploaded during your application for the competition has been rejected due to the following reason:<br> 
          ${reason} <br>
          Please re-upload your image again as soon as possible so you won't be screened out of the competition</p>
        </body>
      </html>
    `

    await this.sendEmail({
      title: "Birth certificate upload rejected",
      to: application.email,
      message
    });
  }

  sendHafizCertificateRejectionMail = async (application: Application, reason: string) => {
    const message = `
      <html>
        <body>
          <p>Dear ${application.fname}</p>
          <p>We are so sorry to inform you that the Hafiz certificate you uploaded during your application for the competition has been rejected due to the following reason:<br> 
          ${reason} <br>
          Please re-upload your image again as soon as possible so you won't be screened out of the competition</p>
        </body>
      </html>
    `

    await this.sendEmail({
      title: "Hafiz upload rejected",
      to: application.email,
      message
    });
  }
  
}
