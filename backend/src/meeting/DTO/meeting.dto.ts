import { Optional } from '@nestjs/common';
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class ScheduleMeetDTO {
  @IsNotEmpty({ message: 'Please provide title' })
  @IsString()
  title!: string;

  @IsNotEmpty({ message: 'Please provide stream author name' })
  @IsString()
  author!: string;
  
 
  dateAndTime!: string;
}
