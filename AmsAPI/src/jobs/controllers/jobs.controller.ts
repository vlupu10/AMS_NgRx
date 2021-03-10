import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateJobDto } from './../dto/create-job.dto';
import { JobsService } from './../services/jobs.service';
import { Job } from './../interfaces/job.interface';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get()
    findAll(): Promise<Job[]> {
        return this.jobsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Job> {
        return this.jobsService.findOne(id);
    }

    @Post()
    create(@Body() createItemDto: CreateJobDto): Promise<Job> {
        return this.jobsService.create(createItemDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Job> {
        return this.jobsService.delete(id);
    }

    @Put(':id')
    update(@Body() updateItemDto: CreateJobDto, @Param('id') id): Promise<Job> {
        return this.jobsService.update(id, updateItemDto);
    }
}
