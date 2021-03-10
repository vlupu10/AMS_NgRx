export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string
    role: string;
    city: string;
    email: string;
    phone?: string;
    date: string;
}

export class User {
    // tslint:disable-next-line: variable-name
    _id?: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string
    role: string;
    city: string;
    email: string;
    phone?: string;
    date: any;

    constructor(props: {
        _id?: string;
        firstName?: string;
        lastName?: string;
        username?: string;
        password?: string
        role?: string;
        city?: string;
        email?: string;
        phone?: string;
        date?: any;
    } = {}) {
        this._id = props._id || '';
        this.firstName = props.firstName || '';
        this.lastName = props.lastName || '';
        this.username = props.username || '';
        this.password = props.password || '';
        this.role = props.role || '';
        this.city = props.city || '';
        this.email = props.email || '';
        this.phone = props.phone || '';
        this.date = props.date || new Date();
    }
}
