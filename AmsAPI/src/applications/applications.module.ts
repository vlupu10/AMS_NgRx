import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationsController } from './controllers/applications.controller';
import { ApplicationsService } from './services/applications.service';
import { ApplicationSchema } from './schemas/application.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Application', schema: ApplicationSchema}])],
    controllers: [ ApplicationsController ],
    providers: [ ApplicationsService ],
})
export class ApplicationsModule {}
