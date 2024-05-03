import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
    @Prop()
    name: string;

    @Prop()
    value: number;

    @Prop()
    duration: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    students: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
