import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvestorModule } from './investor/investor.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InvestorProfileModule } from './investor-profile/investor-profile.module';
import { AdminModule } from './admin/admin.module';
import { TwilioModule, TwilioService } from 'nestjs-twilio';

@Module({
  imports: [
    InvestorModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    // TwilioModule.forRoot({
    //   accountSid: process.env.TWILIO_ACCOUNT_SID,
    //   authToken: process.env.TWILIO_AUTH_TOKEN,
    // }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    InvestorProfileModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, TwilioService],
})
export class AppModule {}
