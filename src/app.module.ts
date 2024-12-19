import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TranslationModule } from './translation/translation.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassTransformer } from 'class-transformer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TranslationModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
