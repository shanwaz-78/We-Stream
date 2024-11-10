import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleStream } from './Entity/stream.entity';
import { ScheduleStreamDTO } from './DTO/stream.dto';

@Injectable()
export class ScheduleStreamService {
  constructor(
    @InjectRepository(ScheduleStream)
    private readonly scheduleStreamRepo: Repository<ScheduleStream>,
  ) {}

  async scheduleStream(
    scheduleDetails: ScheduleStreamDTO,
  ): Promise<ScheduleStream> {
    try {
      const stream = this.scheduleStreamRepo.create(scheduleDetails);
      return await this.scheduleStreamRepo.save(stream);
    } catch (error) {
      throw new InternalServerErrorException('Failed to schedule stream');
    }
  }

  async getAllStreams(): Promise<ScheduleStream[]> {
    try {
      return await this.scheduleStreamRepo.find({
        where: { isCompleted: false },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve streams');
    }
  }

  async completeStream(streamId: number): Promise<ScheduleStream> {
    try {
      await this.scheduleStreamRepo.update(streamId, { isCompleted: true });
      const updatedStream = await this.scheduleStreamRepo.findOneBy({
        stream_id: streamId,
      });
      if (!updatedStream) {
        throw new NotFoundException(`Stream with ID ${streamId} not found`);
      }
      return updatedStream;
    } catch (error) {
      throw new InternalServerErrorException('Failed to complete stream');
    }
  }

  async editStream(
    streamId: number,
    newDetails: Partial<ScheduleStreamDTO>,
  ): Promise<ScheduleStream> {
    try {
      await this.scheduleStreamRepo.update(streamId, newDetails);
      const updatedStream = await this.scheduleStreamRepo.findOneBy({
        stream_id: streamId,
      });
      if (!updatedStream) {
        throw new NotFoundException(`Stream with ID ${streamId} not found`);
      }
      return updatedStream;
    } catch (error) {
      throw new InternalServerErrorException('Failed to edit stream');
    }
  }

  async deleteStream(streamId: number): Promise<void> {
    try {
      const result = await this.scheduleStreamRepo.delete(streamId);
      if (result.affected === 0) {
        throw new NotFoundException(`Stream with ID ${streamId} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete stream');
    }
  }
}
