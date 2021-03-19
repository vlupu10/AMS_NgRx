import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async generateJWT({username, password}): Promise<string> {
        try {
            const tkn = await this.jwtService.signAsync({ username, password });
            return tkn;
        } catch (err) {
            throw err;
        }
    }

    hashPassword(password: string): string {
        return bcrypt.hashSync(password, 12);
    }

    comparePasswords(newPassword: string, passwordHash: string): Promise<any | boolean> {
        return bcrypt.compare(newPassword, passwordHash);
    }
}
