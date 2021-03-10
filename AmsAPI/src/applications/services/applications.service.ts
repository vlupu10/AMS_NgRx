import { Injectable } from '@nestjs/common';
import { Application } from './../interfaces/application.interface';
import { ApplicationSchema, ApplicationModel } from './../models/application.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ApplicationsService {
  constructor(@InjectModel('Application') private applicationModel: Model<any>) {}

  async findAll(): Promise<Application[]> {
    return await this.applicationModel.find();
  }

  async findOne(id: string): Promise<Application> {
    return await this.applicationModel.findOne({ _id: id });
  }

  async create(application: Application): Promise<Application> {
    const newApplication = new this.applicationModel(application);
    return await newApplication.save();
  }

  async delete(id: string): Promise<Application> {
    return await this.applicationModel.findByIdAndRemove(id);
  }

  async update(id: string, application: Application): Promise<Application> {
    return await this.applicationModel.findByIdAndUpdate(id, application, { new: true });
  }
}
