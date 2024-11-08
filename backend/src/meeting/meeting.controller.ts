import { Controller, Post, Get, Body } from '@nestjs/common';
import { ScheduleMeetService } from './meeting.service';
import { ScheduleMeetDTO } from './DTO/meeting.dto';
import { HttpStatus } from '@nestjs/common';

@Controller('meeting')
export class ScheduleMeetController {
  constructor(private readonly meetingService: ScheduleMeetService) {}

  @Post('/schedule')
  async scheduleMeet(@Body() scheduleDetails: ScheduleMeetDTO) {
    const meeting = await this.meetingService.scheduleMeet(scheduleDetails);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Stream scheduled successfully',
      data: meeting,
    };
  }

  @Get('/get-meetings')
  async getAllMeetings() {
    const meetings = await this.meetingService.getAllMeetings();
    return {
      statusCode: HttpStatus.OK,
      message: 'Meetings fetched successfully',
      data: meetings,
    };
  }
}
