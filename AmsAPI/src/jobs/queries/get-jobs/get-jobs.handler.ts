import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobsService } from '../../services/jobs.service';
import { GetJobsQuery } from './get-jobs.query';

@QueryHandler(GetJobsQuery)
export class GetJobsHandler implements IQueryHandler<GetJobsQuery> {
  constructor(private jobsService: JobsService) {}

  async execute() {
    return await this.jobsService.findAll();
  }
}
