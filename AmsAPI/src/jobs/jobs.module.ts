import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsController } from './controllers/jobs.controller';
import { JobsService } from './services/jobs.service';
import { JobSchema } from './schemas/job.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Job', schema: JobSchema}])],
    controllers: [ JobsController ],
    providers: [ JobsService ],
  })
  export class JobsModule {}
