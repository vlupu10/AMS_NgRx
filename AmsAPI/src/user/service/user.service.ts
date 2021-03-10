import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../../auth/service/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<any>,
    private authService: AuthService,
  ) {}

  async create(user: User): Promise<User> {
    const hash = this.authService.hashPassword(user.password);
    const newUser = new this.userModel({ ...user, passwordHash: hash });
    return await newUser.save();
  }

  login({ username, password, token }): Promise<User[]> {
    return this.userModel
      .find({ username })
      .then((user) => {
        if (user.length) {
          return this.authService
            .comparePasswords(password, user[0]._doc.passwordHash)
            .then((compare) => {
              if (compare) {
                return { ...user[0]._doc, token };
              }
              return null;
            })
            .catch((err) => {
              return err;
            });
        }
        return null;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
