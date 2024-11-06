import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleMeet } from './Entity/meeting.entity';
import { ScheduleMeetDTO } from './DTO/meeting.dto';

@Injectable()
export class ScheduleMeetService {
  constructor(
    @InjectRepository(ScheduleMeet)
    private readonly scheduleMeetRepository: Repository<ScheduleMeet>,
  ) {}

  async scheduleMeet(scheduleDetails: ScheduleMeetDTO): Promise<ScheduleMeet> {
    const meeting = this.scheduleMeetRepository.create(scheduleDetails);
    return await this.scheduleMeetRepository.save(meeting);
  }

  async getAllMeetings(): Promise<ScheduleMeet[]> {
    const allScheduledMeets = await this.scheduleMeetRepository.find();
    return allScheduledMeets;
  }
}
