import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleMeet } from './Entity/meeting.entity';
import { ScheduleMeetController } from './meeting.controller';
import { ScheduleMeetService } from './meeting.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleMeet])],
  controllers: [ScheduleMeetController],
  providers: [ScheduleMeetService],
  exports: [ScheduleMeetService],
})
export class ScheduleMeetModule {}
