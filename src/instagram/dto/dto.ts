import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Instagram username' })
  username: string;

  @ApiProperty({ description: 'Instagram password' })
  password: string;

  @ApiProperty({
    description: 'Two-Factor Authentication code',
    required: false,
  })
  twoFactorCode?: string;

  @ApiProperty({
    description: 'Two-Factor Authentication identifier',
    required: false,
  })
  twoFactorIdentifier?: string;
}

export class GetThreadDetailsDto {
  @ApiProperty({ description: 'Instagram username' })
  username: string;

  @ApiProperty({ description: 'Instagram password' })
  password: string;

  @ApiProperty({ description: 'Thread ID' })
  threadId: string;

  @ApiProperty({
    description: 'Two-Factor Authentication code',
    required: false,
  })
  twoFactorCode?: string;

  @ApiProperty({
    description: 'Two-Factor Authentication identifier',
    required: false,
  })
  twoFactorIdentifier?: string;
}

export class ReplyDto {
  @ApiProperty({ description: 'Instagram username' })
  username: string;

  @ApiProperty({ description: 'Instagram password' })
  password: string;

  @ApiProperty({ description: 'Thread ID' })
  threadId: string;

  @ApiProperty({ description: 'Message to send' })
  message: string;

  @ApiProperty({
    description: 'Two-Factor Authentication code',
    required: false,
  })
  twoFactorCode?: string;

  @ApiProperty({
    description: 'Two-Factor Authentication identifier',
    required: false,
  })
  twoFactorIdentifier?: string;
}

export class StartNewConversationDto {
  @ApiProperty({ description: 'Instagram username' })
  username: string;

  @ApiProperty({ description: 'Instagram password' })
  password: string;

  @ApiProperty({
    description: 'Array of Instagram usernames to start the conversation with',
    example: ['username1', 'username2'],
  })
  recipients: string[];

  @ApiProperty({
    description: 'The message to send to the recipients',
    example: 'Hello, this is a test message!',
  })
  message: string;

  @ApiProperty({
    description: 'Two-Factor Authentication code',
    required: false,
  })
  twoFactorCode?: string;

  @ApiProperty({
    description: 'Two-Factor Authentication identifier',
    required: false,
  })
  twoFactorIdentifier?: string;
}
export class DeleteMessageDto {
  @ApiProperty({ description: 'Instagram username' })
  username: string;

  @ApiProperty({ description: 'Instagram password' })
  password: string;

  @ApiProperty({ description: 'Thread ID' })
  threadId: string;

  @ApiProperty({ description: 'Item ID of the message to delete' })
  itemId: string;

  @ApiProperty({
    description: 'Two-Factor Authentication code',
    required: false,
  })
  twoFactorCode?: string;

  @ApiProperty({
    description: 'Two-Factor Authentication identifier',
    required: false,
  })
  twoFactorIdentifier?: string;
}
