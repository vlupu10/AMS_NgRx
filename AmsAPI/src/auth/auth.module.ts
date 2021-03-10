import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import config from './../config/keys';
import { AppConfigService } from '../config/app-config.service';
import { AuthService } from './service/auth.service';

@Module({
    imports: [
        JwtModule.register({
            secret: config.jwtSecret,
            signOptions: { expiresIn: '7200s' },
        }),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule { }
