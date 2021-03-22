import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateJobDto } from './../dto/create-job.dto';
import { JobsService } from './../services/jobs.service';
import { JobModel } from '../schemas/job.schema.mko';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetJobsQuery } from '../queries/get-jobs/get-jobs.query';
import { CreateJobCommand } from '../commands/create-job/create-job.command';

@Controller('jobs')
export class JobsController {
    constructor(
        private readonly jobsService: JobsService,
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    findAll(): Promise<JobModel[]> {
        // return this.jobsService.findAll();
        return this.queryBus.execute<GetJobsQuery, JobModel[]>(new GetJobsQuery());
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<JobModel> {
        return this.jobsService.findOne(id);
    }

    @Post()
    create(@Body() createItemDto: CreateJobDto): Promise<JobModel> {
        return this.commandBus.execute(new CreateJobCommand(createItemDto));
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<JobModel> {
        return this.jobsService.delete(id);
    }

    @Put(':id')
    update(@Body() updateItemDto: CreateJobDto, @Param('id') id): Promise<JobModel> {
        return this.jobsService.update(id, updateItemDto);
    }
}
