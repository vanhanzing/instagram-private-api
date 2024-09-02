import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('hide-thread')
  async hideThread(
    @Body() body: { username: string; password: string; threadId: string },
  ) {
    await this.appService.login(body.username, body.password);
    const result = await this.appService.hideThread(body.threadId);
    return { success: true, result };
  }

  @Post('get-threads')
  async getThreads(@Body() body: { username: string; password: string }) {
    await this.appService.login(body.username, body.password);
    const result = await this.appService.getThreads();
    return { success: true, threads: result.inbox.threads };
  }

  // @Post('get-thread-details')
  // async getThreadDetails(
  //   @Body() body: { username: string; password: string; threadId: string },
  // ) {
  //   await this.appService.login(body.username, body.password);
  //   return await this.appService.getThreadDetails(body.threadId);
  // }
}
