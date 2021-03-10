export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    passwordHash?: string;
    email?: string;
    phone?: string;
    role?: UserRole;
    city?: string;
    date?: string;
}
export enum UserRole {
    ADMIN = 'admin',
    EMPLOYER = 'employer',
    USER = 'user',
}
