import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  year: number;

  @Prop({ default: false })
  isPublished: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
