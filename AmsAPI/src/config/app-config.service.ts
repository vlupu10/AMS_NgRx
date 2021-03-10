import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {

    constructor(private configService: ConfigService) {}

    get name(): string {
        return this.configService.get<string>('AMS');
    }
    get env(): string {
        const cs: string = this.configService.get<string>('.env');
        Logger.log('env', cs);
        return this.configService.get<string>('.env');
    }
    get url(): string {
        return this.configService.get<string>('app.url');
    }
    get port(): number {
        return Number(this.configService.get<number>('app.port'));
    }
}
