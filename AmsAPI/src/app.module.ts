import { Logger, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import config from './config/keys';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
@Module({
  imports: [
    UserModule,
    JobsModule,
    ApplicationsModule,
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'mongo',
      clientUrl: config.mongoURI,
      dbName: 'test',
      highlighter: new MongoHighlighter(),
      debug: true,
      logger: (message) => {
        const logger = new Logger();
        logger.log(`Mikro orm: ${message}`);
      },
      discovery: {
        warnWhenNoEntities: false, // by default, discovery throws when no entity is processed
        requireEntitiesArray: true, // force usage of class refrences in `entities` instead of paths
        alwaysAnalyseProperties: false, // do not analyse properties when not needed (with ts-morph)
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
