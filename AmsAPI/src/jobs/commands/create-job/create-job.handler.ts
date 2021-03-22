import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JobModel } from 'src/jobs/schemas/job.schema.mko';
import { JobsService } from 'src/jobs/services/jobs.service';
import { CreateJobCommand } from './create-job.command';

@CommandHandler(CreateJobCommand)
export class CreateJobCommandHandler implements ICommandHandler<CreateJobCommand>{
    constructor(private jobsService: JobsService) {}
    async execute(command: CreateJobCommand): Promise<JobModel> {

        return await this.jobsService.create(command.data);
    }

}