import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthService } from '../../auth/service/auth.service';
import { UserService } from '../service/user.service';
import { User } from '../interfaces/user.interface';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { CreateUserDto } from './dto/create-user.dto';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() { username, password }): Promise<User[]> {
    return this.authService
      .generateJWT({ username, password })
      .then((jwt: string) => {
        return this.userService.login({ username, password, token: jwt });
      })
      .catch((error) => {
        throw error;
      });
  }

  @Get(':id')
  findOne(@Param() params): Promise<User> {
    return this.userService.findOne(params.id);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<User> {
    return this.userService.delete(id);
  }

  @Put(':id')
  update(@Body() updateItemDto: CreateUserDto, @Param('id') id): Promise<User> {
    return this.userService.update(id, updateItemDto);
  }
}
