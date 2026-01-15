import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OtpService } from './otp.service';
import { EmailOtp } from './entities/email-otp.entity';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly otpService: OtpService,
    private readonly jwtService: JwtService,
  ) {}

  async requestOtp(email: string) {
    await this.entityManager.nativeDelete(EmailOtp, {
      email,
    });

    const code = this.otpService.generateCode();
    const codeHash = this.otpService.hash(code);

    const otp = this.entityManager.create(EmailOtp, {
      email,
      codeHash,
    });

    await this.entityManager.persist(otp).flush();

    await this.otpService.sendOtp(email, code);

    return {
      success: true,
    };
  }

  async verifyOtp(email: string, code: string) {
    const otp = await this.entityManager.findOne(EmailOtp, { email });

    if (!otp) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    if (otp.expiresAt < new Date()) {
      await this.entityManager.remove(otp).flush();
      throw new BadRequestException('OTP expired');
    }

    const codeHash = this.otpService.hash(code);
    if (codeHash !== otp.codeHash) {
      otp.attempts += 1;
      await this.entityManager.persist(otp).flush();

      if (otp.attempts >= 5) {
        await this.entityManager.remove(otp).flush();
      }

      throw new BadRequestException('Invalid OTP');
    }

    await this.entityManager.remove(otp).flush();

    let user = await this.entityManager.findOne(User, { email });
    if (!user) {
      user = this.entityManager.create(User, { email });
      await this.entityManager.persist(user).flush();
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    return {
      accessToken: token,
    };
  }
}
