import { Injectable } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../schemas/user.schema.mko';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../../auth/service/auth.service';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel) private readonly userRepository: EntityRepository<UserModel>,
    private authService: AuthService,
  ) {}

  async login({ username, password, token }): Promise<UserModel[]> {
    try {
      const user = await this.userRepository
        .find({ username });
      if (user.length) {
        return this.authService
          .comparePasswords(password, user[0].passwordHash)
          .then((compare) => {
            if (compare) {
              return { ...user[0], token };
            }
            return null;
          })
          .catch((err) => {
            return err;
          });
      }
      return null;
    } catch (err_1) {
      throw err_1;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: string): Promise<UserModel> {
    return await this.userRepository.findOne({id});
  }

  async create(user: User): Promise<UserModel> {
    const hash = this.authService.hashPassword(user.password);
    const newUser = this.userRepository.create({ ...user, passwordHash: hash });
    this.userRepository.persist(newUser);
    await this.userRepository.flush();
    return newUser;
  }
  
  async update(id: string, user: User): Promise<UserModel> {
    let userObj = await this.findOne(id);
    userObj = this.userRepository.assign(userObj, user);
    this.userRepository.persistAndFlush(userObj);
    return userObj;
  }

  async delete(id: string): Promise<UserModel> {
    const userObj = await this.findOne(id);
    this.userRepository.removeAndFlush(userObj);
    return userObj;
  }
}
