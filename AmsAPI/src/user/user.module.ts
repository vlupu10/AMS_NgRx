import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserDto } from './models/user.dto';
import { UserSchema } from './schemas/user.schema';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([UserDto]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
