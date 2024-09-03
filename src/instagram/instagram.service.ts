import { Injectable } from '@nestjs/common';
import {
  IgApiClient,
  IgLoginTwoFactorRequiredError,
} from 'instagram-private-api';
import Bottleneck from 'bottleneck';

@Injectable()
export class InstagramService {
  private ig: IgApiClient;
  private limiter: Bottleneck;

  constructor() {
    this.ig = new IgApiClient();

    // Set up rate limiting to prevent exceeding Instagram's limits
    this.limiter = new Bottleneck({
      maxConcurrent: 1, // Only one request at a time
      minTime: 500, // Wait at least 500ms between requests
    });
  }

  async login(
    username: string,
    password: string,
    twoFactorCode?: string,
    twoFactorIdentifier?: string,
  ) {
    this.ig.state.generateDevice(username);

    try {
      // Attempt a normal login
      return await this.ig.account.login(username, password);
    } catch (error) {
      if (error instanceof IgLoginTwoFactorRequiredError) {
        const twoFactorInfo = error.response.body.two_factor_info;

        if (!twoFactorCode) {
          throw new Error('Two-factor authentication code is required.');
        }

        // Perform two-factor login
        return await this.ig.account.twoFactorLogin({
          username,
          verificationCode: twoFactorCode,
          twoFactorIdentifier:
            twoFactorIdentifier || twoFactorInfo.two_factor_identifier,
          verificationMethod: '1', // '1' typically represents SMS; adjust as needed
          trustThisDevice: '1', // Optional: Set to '1' if you want to trust this device
        });
      } else {
        throw new Error('Failed to login: ' + error.message);
      }
    }
  }

  async getThreads() {
    return this.limiter.schedule(async () => {
      try {
        const inboxFeed = this.ig.feed.directInbox();
        const threads = await inboxFeed.items();
        return threads;
      } catch (error) {
        throw new Error('Failed to retrieve threads: ' + error.message);
      }
    });
  }

  async getThreadDetails(threadId: string) {
    return this.limiter.schedule(async () => {
      try {
        const thread = this.ig.entity.directThread(threadId);
        console.log(
          '🚀 ~ InstagramService ~ returnthis.limiter.schedule ~ thread:',
          thread,
        );

        const messagesFeed = this.ig.feed.directThread({
          thread_id: threadId,
          oldest_cursor: '', // Start with the most recent messages
        });
        console.log(
          '🚀 ~ InstagramService ~ returnthis.limiter.schedule ~ messagesFeed:',
          messagesFeed,
        );
        // const messages = await messagesFeed.records();

        // const userIds = thread.userIds;
        // const lastActivityAt = thread.lastActivityAt;

        // return {
        //   threadId: thread.threadId,
        //   userIds,
        //   messages,
        //   lastActivityAt,
        // };
      } catch (error) {
        throw new Error('Failed to retrieve thread details: ' + error.message);
      }
    });
  }

  async replyToThread(threadId: string, message: string) {
    return this.limiter.schedule(async () => {
      try {
        const thread = await this.ig.entity.directThread(threadId);
        await thread.broadcastText(message);
        return { success: true, message: 'Message sent successfully' };
      } catch (error) {
        throw new Error('Failed to send message: ' + error.message);
      }
    });
  }

  async deleteMessage(threadId: string, itemId: string) {
    return this.limiter.schedule(async () => {
      try {
        const thread = await this.ig.entity.directThread(threadId);
        await thread.deleteItem(itemId);
        return { success: true, message: 'Message deleted successfully' };
      } catch (error) {
        throw new Error('Failed to delete message: ' + error.message);
      }
    });
  }
}
