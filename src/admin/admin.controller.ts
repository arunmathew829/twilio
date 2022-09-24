import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { AdminService } from './admin.service';
import { AdminAuthService } from './admin.auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { ResetPasswordDto } from './dto/resetpoasswird.dto';
import { InvestorService } from 'src/investor/investor.service';
import { CreateInvestorDto } from 'src/investor/dto/create-investor.dto';
import { AuthService } from 'src/investor/auth.service';
import { TwilioService } from 'nestjs-twilio';
import { SMSDto } from './dto/sms-dto';
import { ConfigModule } from '@nestjs/config';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private adminAuthService: AdminAuthService,
    private investorService: InvestorService,
    private authService: AuthService,
    private readonly twilioService: TwilioService,
  ) {}

  @Post('auth/signup')
  async signup(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.adminAuthService.signup(createAdminDto);
    return admin;
  }
  @Post('auth-investor/signup')
  async signupInvestor(@Body() createInvestorDto: CreateInvestorDto) {
    const investor = await this.authService.signupInvestor(createInvestorDto);
    return investor;
  }
  //this is to get sms-otp
  @Get('get-otp')
  async sendSMS(@Body() smsDto: SMSDto) {
    return this.twilioService.client.messages
      .create({
        // body: 'SMS Body, sent to the phone!',
        from: process.env.TWILIO_PHONE_NUMBER,
        // to: `+${smsDto.number}`,
        to: '+919847528024',
        // channel : smsDto.channel,
      })
      .then((data) => {
        console.log(data.status);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //this is to verify sms-otp
  @Get('verify-otp')
  async verifySMS(@Body() smsDto: SMSDto) {
    return this.twilioService.client.messages
      .create({
        // body: 'SMS Body, sent to the phone!',
        from: process.env.TWILIO_PHONE_NUMBER,
        // to: `+${smsDto.number}`,
        to: '+919847528024',
        // channel : smsDto.channel,
      }).then((data)=>{
        return data
      })


  @Post('auth/signin')
  async signin(@Body() loginAdminDto: LoginAdminDto) {
    const admin = await this.adminAuthService.signin(
      loginAdminDto.email,
      loginAdminDto.password,
    );
    return admin;
  }

  @Get('get-password-reset-link/:email')
  getPasswordResetLink(@Param('email') email: string) {
    return this.adminAuthService.sendUserPasswordResetMail(email);
  }

  //@ApiBearerAuth()
  //@UseGuards(AdminGuard)
  @Post('reset-password/')
  changeYourPassword(@Body() body: ResetPasswordDto) {
    //if (req.token.email != body.email) throw new BadRequestException();
    //const resetToken = req.headers.authorization.split(' ')[1];
    return this.adminAuthService.resetPassword(body.email, body.newPassword);
  }

  //@ApiBearerAuth()
  //@UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  // @Get('get-one/:id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findOne(+id);
  // }

  @Get('/investorslist')
  findAllInvestors() {
    return this.adminService.findAllInvestors();
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAdminDto: UpdateAdminDto,
  // ) {
  //   return this.adminService.update(+id, updateAdminDto);
  // }

  //@ApiBearerAuth()
  //@UseGuards(AdminGuard)
  @Delete('/delete-admin/:email')
  remove(@Param('email') email: string) {
    return this.adminService.remove(email);
  }

  @Delete('/delete-investor/:email')
  removeInvestor(@Param('email') email: string) {
    return this.investorService.removeInvestor(email);
  }
}
