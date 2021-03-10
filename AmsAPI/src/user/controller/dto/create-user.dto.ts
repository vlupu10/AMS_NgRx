export class CreateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
    readonly password: string;
    readonly passwordHash: string;
    readonly email: string;
    readonly phone: string;
    readonly role: string;
    readonly city: string;
    readonly date: string;
}