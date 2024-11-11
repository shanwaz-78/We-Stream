import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ScheduleStreamService } from './stream.service';
import { ScheduleStreamDTO } from './DTO/stream.dto';
import { HttpStatus } from '@nestjs/common';

@Controller('stream')
export class ScheduleStreamController {
  constructor(private readonly streamService: ScheduleStreamService) {}

  @Post('/schedule')
  async scheduleStream(@Body() scheduleDetails: ScheduleStreamDTO) {
    const streams = await this.streamService.scheduleStream(scheduleDetails);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Stream scheduled successfully',
      data: streams,
    };
  }

  @Get('/get-streams')
  async getAllStreams() {
    const stream = await this.streamService.getAllStreams();
    return {
      statusCode: HttpStatus.OK,
      message: 'Streams fetched successfully',
      data: stream,
    };
  }

  @Get('/get-past-streams')
  async getPastStreams(){
    const stream = await this.streamService.getPastStreams();
    return {
      statusCode: HttpStatus.OK,
      message: 'Streams fetched successfully',
      data: stream,
    };
  }

  @Post('/complete-stream/:streamId')
  async completeStream(@Param('streamId') streamId: number) {
    const updatedStream = await this.streamService.completeStream(streamId);
    return {
      statusCode: HttpStatus.OK,
      message: `Stream Completed`,
      data: updatedStream,
    };
  }

  @Put('/edit-stream/:streamId')
  async editStream(
    @Param('streamId') streamId: number,
    @Body() newDetails: Partial<ScheduleStreamDTO>,
  ) {
    const editedStream = await this.streamService.editStream(
      streamId,
      newDetails,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Stream updated successfully',
      data: editedStream,
    };
  }

  @Delete('/delete-stream/:streamId')
  async deleteStream(@Param('streamId') streamId: number) {
    await this.streamService.deleteStream(streamId);
    return {
      statusCode: HttpStatus.OK,
      message: `Stream Deleted successfully`,
    };
  }
}
