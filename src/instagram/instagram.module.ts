import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { InstagramController } from './instagram.controller';

@Module({
  controllers: [InstagramController],
  providers: [InstagramService],
})
export class InstagramModule {}
