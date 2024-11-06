import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class ScheduleMeetDTO {
  @IsNotEmpty({ message: 'Please provide title' })
  @IsString()
  title!: string;

  @IsNotEmpty({ message: 'Please provide stream author name' })
  @IsString()
  author!: string;

  @IsNotEmpty({ message: 'Please provide date' })
  @IsDateString(
    {},
    { message: 'Please provide a valid date in YYYY-MM-DD format' },
  )
  date!: string;
}
