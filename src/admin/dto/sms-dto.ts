import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class SMSDto {
  @IsNotEmpty()
  @IsNumber()
  number: string;

  //   @IsNotEmpty()
  //   @IsString()
  //   channel: string;
}
