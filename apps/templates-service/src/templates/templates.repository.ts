import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@ntua-saas-10/database';
import { Template } from './schemas/template.schema';
import { Connection, Model } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class TemplatesRepository extends AbstractRepository<Template> {
  protected readonly logger = new Logger(TemplatesRepository.name);

  constructor(
    @InjectModel(Template.name) templateModel: Model<Template>,
    @InjectConnection() connection: Connection
  ) {
    super(templateModel, connection);
  }
}
