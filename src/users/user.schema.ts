import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  nationality: string;

  @Prop({ required: true })
  profile: string;

  @Prop({
    required: true,
    enum: [
      'ADMIN',
      'TEACHER',
      'TEACHER_ASSISTANT',
      'PO_MANAGER',
      'CHIEF_MANAGE',
    ],
  })
  role: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
