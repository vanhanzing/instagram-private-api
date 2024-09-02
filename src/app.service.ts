import { Injectable } from '@nestjs/common';
import {
  IgApiClient,
  IgLoginTwoFactorRequiredError,
} from 'instagram-private-api';

@Injectable()
export class AppService {
  private ig: IgApiClient;

  constructor() {
    this.ig = new IgApiClient();
  }
  async login(
    username: string,
    password: string,
    twoFactorCode?: string,
    twoFactorIdentifier?: string,
  ) {
    this.ig.state.generateDevice(username);

    try {
      // Attempt normal login
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
  async hideThread(threadId: string) {
    try {
      const result = await this.ig.directThread.hide(threadId);
      return result;
    } catch (error) {
      throw new Error('Failed to hide thread: ' + error.message);
    }
  }

  async getThreads() {
    try {
      const inbox = await this.ig.feed.directInbox().request();
      return inbox;
    } catch (error) {
      throw new Error('Failed to retrieve threads: ' + error.message);
    }
  }

  // async getThreadDetails(threadId: string) {
  //   try {
  //     const thread = await this.ig.entity.directThread(threadId);
  //     const threadInfo = await thread.items(); // Fetches all items (messages) in the thread
  //     const users = thread.users(); // Fetches all users in the thread
  //     const lastActivity = thread.lastActivityAt; // Fetches the last activity time in the thread

  //     return {
  //       threadId: thread.threadId,
  //       users,
  //       items: threadInfo,
  //       lastActivity,
  //     };
  //   } catch (error) {
  //     throw new Error('Failed to retrieve thread details: ' + error.message);
  //   }
  // }
}
