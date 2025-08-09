import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Delete, Headers } from '@nestjs/common';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { WebsitesService } from './websites.service';

@Controller('websites')
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService) {}

  @Post()
  async create(@Body() body: CreateWebsiteDto) {
    if (!body?.idea) {
      throw new HttpException({ error: 'idea is required' }, HttpStatus.BAD_REQUEST);
    }
    return this.websitesService.create(body.idea);
  }

  @Get()
  async list(@Query('limit') limit?: string) {
    const n = limit ? Math.min(parseInt(limit, 10) || 20, 100) : 20;
    return this.websitesService.list(n);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const found = await this.websitesService.findById(id);
    if (!found) {
      throw new HttpException({ error: 'not found' }, HttpStatus.NOT_FOUND);
    }
    return {
      id: found._id.toString(),
      idea: found.idea,
      sections: found.sections,
      createdAt: found.createdAt,
    };
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const ok = await this.websitesService.deleteOne(id);
    if (!ok) {
      throw new HttpException({ error: 'not found or failed' }, HttpStatus.NOT_FOUND);
    }
    return { deleted: true, id };
  }

  @Delete()
  async deleteAll(@Headers('x-confirm-delete-all') confirm?: string) {
    if (confirm !== 'YES') {
      throw new HttpException({ error: 'confirmation header x-confirm-delete-all=YES required' }, HttpStatus.BAD_REQUEST);
    }
    const count = await this.websitesService.deleteAll();
    return { deleted: count };
  }
}
