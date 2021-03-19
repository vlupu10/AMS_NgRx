import { Injectable } from '@nestjs/common';
import { Job } from './../interfaces/job.interface';
import { JobModel } from '../schemas/job.schema.mko';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mongodb';
@Injectable()
export class JobsService {
  constructor(@InjectRepository(JobModel) private jobRepository: EntityRepository<JobModel>) {}

  async findAll(): Promise<JobModel[]> {
    return await this.jobRepository.findAll();
  }

  async findOne(id: string): Promise<JobModel> {
    return await this.jobRepository.findOne({id});
  }

  async create(job: Job): Promise<JobModel> {
    const newJob = this.jobRepository.create(job);
    this.jobRepository.persist(newJob);
    await this.jobRepository.flush();
    return newJob;
  }

  async delete(id: string): Promise<JobModel> {
    const jobObj = await this.findOne(id);
    this.jobRepository.removeAndFlush(jobObj);
    return jobObj;
  }

  async update(id: string, job: Job): Promise<JobModel> {
    let jobObj = await this.findOne(id);
    jobObj = this.jobRepository.assign(jobObj, job);
    this.jobRepository.persistAndFlush(jobObj);
    return jobObj;
  }
}
