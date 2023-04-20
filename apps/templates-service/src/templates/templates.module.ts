import { Module } from '@nestjs/common';
import { DatabaseModule } from '@ntua-saas-10/database';
import { TemplatesRepository } from './templates.repository';
import { Template, TemplateSchema } from './schemas/template.schema';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Template.name, schema: TemplateSchema }]),
  ],
  controllers: [TemplatesController],
  providers: [TemplatesController, TemplatesService, TemplatesRepository],
})
export class TemplatesModule {}
