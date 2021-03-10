import { Injectable } from '@nestjs/common';
import { Job } from './../interfaces/job.interface';
import { JobSchema, JobModel } from './../models/job.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JobsService {
  constructor(@InjectModel('Job') private jobModel: Model<any>) {}

  async findAll(): Promise<Job[]> {
    return await this.jobModel.find();
  }

  async findOne(id: string): Promise<Job> {
    return await this.jobModel.findOne({ _id: id });
  }

  async create(job: Job): Promise<Job> {
    const newJob = new this.jobModel(job);
    return await newJob.save();
  }

  async delete(id: string): Promise<Job> {
    return await this.jobModel.findByIdAndRemove(id);
  }

  async update(id: string, job: Job): Promise<Job> {
    return await this.jobModel.findByIdAndUpdate(id, job, { new: true });
  }
}
