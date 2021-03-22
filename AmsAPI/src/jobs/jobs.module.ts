import { Module } from '@nestjs/common';
import { JobsController } from './controllers/jobs.controller';
import { JobsService } from './services/jobs.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JobModel } from './schemas/job.schema.mko';
import { GetJobsHandler } from './queries/get-jobs/get-jobs.handler';
import { CreateJobCommandHandler } from './commands/create-job/create-job.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, MikroOrmModule.forFeature([JobModel])],
  controllers: [ JobsController ],
    providers: [ 
      JobsService,
      GetJobsHandler,
      CreateJobCommandHandler,
     ],
  })
  export class JobsModule {}
