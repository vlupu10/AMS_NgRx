import { Module } from '@nestjs/common';
import { JobsController } from './controllers/jobs.controller';
import { JobsService } from './services/jobs.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JobModel } from './schemas/job.schema.mko';

@Module({
  imports: [MikroOrmModule.forFeature([JobModel])],
  controllers: [ JobsController ],
    providers: [ JobsService ],
  })
  export class JobsModule {}
