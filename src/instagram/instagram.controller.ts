import { Controller, Post, Body } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  LoginDto,
  GetThreadDetailsDto,
  ReplyDto,
  DeleteMessageDto,
} from './dto/dto';

@ApiTags('instagram')
@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login to Instagram' })
  @ApiResponse({ status: 201, description: 'Successfully logged in.' })
  async login(@Body() body: LoginDto) {
    const result = await this.instagramService.login(
      body.username,
      body.password,
      body.twoFactorCode,
      body.twoFactorIdentifier,
    );
    return { success: true, result };
  }

  @Post('get-threads')
  @ApiOperation({ summary: 'Get Instagram threads' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved threads.' })
  async getThreads(@Body() body: LoginDto) {
    await this.instagramService.login(
      body.username,
      body.password,
      body.twoFactorCode,
      body.twoFactorIdentifier,
    );
    const result = await this.instagramService.getThreads();
    return { success: true, threads: result };
  }

  @Post('get-thread-details')
  @ApiOperation({ summary: 'Get details of a specific thread' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved thread details.',
  })
  async getThreadDetails(@Body() body: GetThreadDetailsDto) {
    await this.instagramService.login(
      body.username,
      body.password,
      body.twoFactorCode,
      body.twoFactorIdentifier,
    );
    const result = await this.instagramService.getThreadDetails(body.threadId);
    return { success: true, thread: result };
  }

  @Post('reply')
  @ApiOperation({ summary: 'Reply to a specific thread' })
  @ApiResponse({ status: 200, description: 'Successfully sent a reply.' })
  async replyToThread(@Body() body: ReplyDto) {
    await this.instagramService.login(
      body.username,
      body.password,
      body.twoFactorCode,
      body.twoFactorIdentifier,
    );
    const result = await this.instagramService.replyToThread(
      body.threadId,
      body.message,
    );
    return { success: true, result };
  }

  @Post('delete-message')
  @ApiOperation({ summary: 'Delete a specific message in a thread' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the message.',
  })
  async deleteMessage(@Body() body: DeleteMessageDto) {
    await this.instagramService.login(
      body.username,
      body.password,
      body.twoFactorCode,
      body.twoFactorIdentifier,
    );
    const result = await this.instagramService.deleteMessage(
      body.threadId,
      body.itemId,
    );
    return { success: true, result };
  }
}
