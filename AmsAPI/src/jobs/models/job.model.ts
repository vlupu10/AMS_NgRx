import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = JobModel & Document;

@Schema()
export class JobModel {
    @Prop()
    type: string;

    @Prop()
    requirements: string;

    @Prop()
    employerDetails: string;

    @Prop()
    date: string;

    @Prop()
    employer: string;

    @Prop()
    city: string;

    @Prop()
    salary: string;

    @Prop()
    domain: string;
}

export const JobSchema = SchemaFactory.createForClass(JobModel);
