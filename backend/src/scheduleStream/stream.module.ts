import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleStream } from './Entity/stream.entity';
import { ScheduleStreamController } from './stream.controller';
import { ScheduleStreamService } from './stream.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleStream])],
  controllers: [ScheduleStreamController],
  providers: [ScheduleStreamService],
  exports: [ScheduleStreamService],
})
export class ScheduleStreamModule {}
