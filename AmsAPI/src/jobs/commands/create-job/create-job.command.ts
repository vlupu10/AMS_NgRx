import { ICommand } from '@nestjs/cqrs';
import { CreateJobDto } from 'src/jobs/dto/create-job.dto';

export class CreateJobCommand implements ICommand {
    constructor(
        public data: CreateJobDto
    ){ }
}