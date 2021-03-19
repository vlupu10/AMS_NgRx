import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/shared/base-entity.entity';

@Entity()
export class UserModel extends BaseEntity{
    @Property()
    id: string;

    @Property()
    firstName: string;

    @Property()
    lastName: string;

    @Property()
    username: string;

    @Property()
    password: string;

    @Property()
    passwordHash: string;

    @Property()
    email: string;

    @Property()
    phone: string;

    @Property()
    role: string;

    @Property()
    city: string;

    @Property()
    date: string;

}

