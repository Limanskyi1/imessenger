import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './modules/users/users.module';
import config from '../mikro-orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.development', isGlobal: true }),
    MikroOrmModule.forRoot(config),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
