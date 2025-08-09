import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebsiteDocument = Website & Document;

@Schema({ timestamps: true })
export class Website {
  @Prop({ required: true })
  idea!: string; // set by Mongoose on document creation

  @Prop({ type: [{ title: String, content: String, order: Number, image: String }], default: [] })
  sections!: { title: string; content: string; order: number; image?: string }[]; // default provided by schema; image optional

  @Prop()
  createdAt?: Date; // injected by timestamps option
}

export const WebsiteSchema = SchemaFactory.createForClass(Website);
