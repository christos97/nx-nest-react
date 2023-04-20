import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { Template } from './schemas/template.schema';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  async getTemplates(): Promise<Template[]> {
    return this.templatesService.findAll();
  }

  @Post()
  async createTemplate(@Body() request: CreateTemplateDto, @Req() req: any) {
    return this.templatesService.createTemplate(request);
  }
}
