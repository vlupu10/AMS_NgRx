import { Injectable } from '@nestjs/common';
import { ApplicationModel } from '../schemas/application.schema.mko';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mongodb';

@Injectable()
export class ApplicationsService {
  // constructor(@InjectModel('Application') private applicationModel: Model<any>) {}
  constructor(@InjectRepository(ApplicationModel) private applicationRepository: EntityRepository<ApplicationModel>) {}

  async findAll(): Promise<ApplicationModel[]> {
    return await this.applicationRepository.findAll();
  }

  async findOne(id: string): Promise<ApplicationModel> {
    return await this.applicationRepository.findOne({ id });
  }

  async create(application: ApplicationModel): Promise<ApplicationModel> {
    const newApplication = this.applicationRepository.create(application);
    this.applicationRepository.persist(newApplication);
    await this.applicationRepository.flush();
    return newApplication;
  }

  async delete(id: string): Promise<ApplicationModel> {
    const applicationObj = await this.findOne(id);
    this.applicationRepository.removeAndFlush(applicationObj);
    return applicationObj;
  }

  async update(id: string, application: ApplicationModel): Promise<ApplicationModel> {
    let applicationObj = await this.findOne(id);
    applicationObj = this.applicationRepository.assign(applicationObj, application);
    this.applicationRepository.persistAndFlush(applicationObj);
    return applicationObj;
  }
}
