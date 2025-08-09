import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsitesController } from './websites.controller';
import { WebsitesService } from './websites.service';
import { Website, WebsiteSchema } from './schemas/website.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Website.name, schema: WebsiteSchema }])],
  controllers: [WebsitesController],
  providers: [WebsitesService],
})
export class WebsitesModule {}
