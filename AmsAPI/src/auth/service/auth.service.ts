import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
// const bcrypt = require('bcrypt');
import * as bcrypt from 'bcrypt'

import { User } from '../../user/models/user.model';
import { Error } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    generateJWT({username, password}): Promise<string> {
        return this.jwtService.signAsync({username, password}).then(tkn => {
           return tkn;
        }).catch(err => {throw err; });
        // return from<string>(this.jwtService.signAsync({username, password}));
    }

    hashPassword(password: string): string {
        return bcrypt.hashSync(password, 12);
        // return from<string>(bcrypt.hashSync(password, 12));
    }

    // comparePasswords(newPassword: string, passwordHash: string): Observable<any | boolean> {
    //     return of<any | boolean>(bcrypt.compare(newPassword, passwordHash));
    // }
    comparePasswords(newPassword: string, passwordHash: string): Promise<any | boolean> {
        return bcrypt.compare(newPassword, passwordHash);
    }
}
