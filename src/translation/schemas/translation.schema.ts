import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

@Schema()
export class Translation {
  @Expose()
  @Transform(({ value }) => value.toString())
  _id: string;

  @Expose()
  @Prop({ type: SchemaTypes.String, required: true })
  key: string;

  @Expose()
  @Prop({ type: SchemaTypes.String, required: true })
  locale: string;

  @Expose()
  @Prop({ type: SchemaTypes.String, required: true })
  value: string;
}

export type TranslationDocument = HydratedDocument<Translation>;
export const TranslationSchema = SchemaFactory.createForClass(Translation)
  .plugin(autopopulate as any)
  .index({ key: 1, locale: 1 }, { unique: true });
