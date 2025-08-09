import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsitesModule } from './websites/websites.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/stunning'),
    WebsitesModule,
  ],
})
export class AppModule {}
