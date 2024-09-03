import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstagramModule } from './instagram/instagram.module';

@Module({
  imports: [InstagramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
