import { Module } from '@nestjs/common';
import { ApplicationsController } from './controllers/applications.controller';
import { ApplicationsService } from './services/applications.service';
import { ApplicationModel } from './schemas/application.schema.mko';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([ApplicationModel])],
    controllers: [ ApplicationsController ],
    providers: [ ApplicationsService ],
})
export class ApplicationsModule {}
