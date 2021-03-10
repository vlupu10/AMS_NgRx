import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateApplicationDto } from './../dto/create-application.dto';
import { ApplicationsService } from './../services/applications.service';
import { Application } from './../interfaces/application.interface';

@Controller('applications')
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) {}

    @Get()
    findAll(): Promise<Application[]> {
        return this.applicationsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Application> {
        return this.applicationsService.findOne(id);
    }

    @Post()
    create(@Body() createApplicationDto: CreateApplicationDto): Promise<Application> {
        return this.applicationsService.create(createApplicationDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Application> {
        return this.applicationsService.delete(id);
    }

    @Put(':id')
    update(@Body() updateItemDto: CreateApplicationDto, @Param('id') id): Promise<Application> {
        return this.applicationsService.update(id, updateItemDto);
    }
}

