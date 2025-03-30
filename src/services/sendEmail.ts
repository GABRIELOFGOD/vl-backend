import * as nodemailer from "nodemailer";
import { EMAIL_SERVICE, GOOGLE_EMAIL_AUTH } from "../config/env";
import { Application } from "../entities/application.entity";
import { application } from "express";

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

  sendAdminRegisterEmail = async (user: { email: string, name: string }) => {

    const message = `
      <html>
        <body>
          <p>The whole team of Verse of Light welcome you as an administrator ${user.name}<br> 
          We trust you with the affairs of the website and administration of the applicants in our subsequest competitions, keep up we hope to see you do exploit in our community</p>
        </body>
      </html>
    `
    
    await this.transporter.sendMail({
      from: EMAIL_SERVICE,
      to: user.email,
      subject: `Welcome ${user.name}`,
      html: message
    });
  }

  applicationMail = async (application: Application) => {}

  sendProfilePhotoRejectionMail = async (application: Application) => {}

  sendBirthCertificateRejectionMail = async (application: Application) => {}

  sendHafizCertificateRejectionMail = async (application: Application) => {}
  
}
