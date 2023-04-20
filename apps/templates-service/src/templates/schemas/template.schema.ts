import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@ntua-saas-10/database';

@Schema({ versionKey: false })
export class Template extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  phoneNumber: string;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
