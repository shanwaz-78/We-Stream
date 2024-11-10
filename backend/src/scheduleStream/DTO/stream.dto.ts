import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ScheduleStreamDTO {
  @IsNotEmpty({ message: 'Please provide title' })
  @IsString()
  title!: string;

  @IsNotEmpty({ message: 'Please provide stream author name' })
  @IsString()
  author!: string;

  @IsOptional()
  dateAndTime?: string;

  @IsOptional()
  isCompleted?: boolean;
}
