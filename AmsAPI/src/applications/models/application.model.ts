import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApplicationDocument = ApplicationModel & Document;

@Schema()
export class ApplicationModel {
    @Prop()
    userId: string;

    @Prop()
    jobId: string;

    @Prop()
    resume: string;

    @Prop()
    date: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(ApplicationModel);
