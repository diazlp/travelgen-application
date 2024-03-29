// import * as path from 'path';
// import { readFileSync } from 'fs';
import { createTransport, Transporter } from 'nodemailer';
import emailVerificationTemplate from './templates/email-verification';

interface IMailVerification {
  fullName: string;
  email: string;
  verificationCode: string;
}

export default class MailService {
  private static transporter: Transporter = createTransport(
    {
      service: 'Sendinblue',
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_HOST),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
    {
      from: 'TravelGen Application <diazlinggaputra@gmail.com>',
    },
  );

  static async emailVerification(userDetail: IMailVerification): Promise<void> {
    try {
      /*USING PATH NOT WORKING IN SERVERLESS FUNCTION ON VERCEL DEPLOYMENT*/
      // const htmlTemplatePath = path.join(
      //   process.cwd(),
      //   'src',
      //   'mail',
      //   'templates',
      //   'email-verification.html',
      // );
      // const htmlTemplate = readFileSync(htmlTemplatePath, 'utf8')
      //   .replace('{{ fullName }}', userDetail.fullName)
      //   .replace('{{ verificationCode }}', userDetail.verificationCode);

      await MailService.transporter.sendMail({
        to: userDetail.email,
        subject: 'TravelGen Email Verification',
        // html: htmlTemplate,
        html: emailVerificationTemplate(
          userDetail.fullName,
          userDetail.verificationCode,
        ),
      });
    } catch (error) {
      throw new Error('Failed to send email verification');
    }
  }
}
