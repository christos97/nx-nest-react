import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { TemplatesRepository } from './templates.repository';

@Injectable()
export class TemplatesService {
  constructor(private readonly templatesRepository: TemplatesRepository) {}

  async createTemplate(request: CreateTemplateDto) {
    const template = await this.templatesRepository.create(request);

    return template;
  }

  findAll() {
    return this.templatesRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} template`;
  }
}
