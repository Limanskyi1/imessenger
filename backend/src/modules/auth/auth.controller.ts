import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestEmailOtpDto } from './dto/request-email-otp-dto';
import { VerifyEmailOtpDto } from './dto/verify-email-otp-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')
  requestOtp(@Body() dto: RequestEmailOtpDto) {
    return this.authService.requestOtp(dto.email);
  }

  @Post('verify-otp')
  verifyOtp(@Body() dto: VerifyEmailOtpDto) {
    return this.authService.verifyOtp(dto.email, dto.code);
  }
}
