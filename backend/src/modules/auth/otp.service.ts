import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';
import { Resend } from 'resend';

@Injectable()
export class OtpService {
  constructor() {}

  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  hash(code: string): string {
    return crypto.createHash('sha256').update(code).digest('hex');
  }

  createOtpBody(email: string, code: string) {
    return {
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${code}. It will expire in 5 minutes.`,
      html: `<p>Your OTP code is: <b>${code}</b></p><p>It will expire in 5 minutes.</p>`,
    };
  }

  async sendOtp(email: string, code: string) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      const body = this.createOtpBody(email, code);
      const resp = await resend.emails.send(body);
      console.log(resp);
    } catch (error) {
      console.error('Error sending email', error);
      throw new InternalServerErrorException('Failed to send OTP email');
    }
  }
}
