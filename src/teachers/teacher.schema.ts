import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { User } from 'src/users/user.schema';

export type TeacherDocument = Teacher & Document;

export class Teacher extends User {
  @Prop({ required: true })
  school: string[];

  @Prop({ required: true })
  class: string[];

  @Prop({ required: true })
  tas: string;

  @Prop({ required: true })
  subjects: string[];

  @Prop({ required: true })
  workingDays: string[];

  @Prop({ required: true })
  workingHours: string[];

  @Prop({ required: true })
  salary: string;

  @Prop({ default: 'QUALFIED' })
  status: string;
}
