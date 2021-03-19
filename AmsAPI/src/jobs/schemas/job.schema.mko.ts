import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/shared/base-entity.entity';

@Entity()
export class JobModel extends BaseEntity{
    @Property()
    type: string;

    @Property()
    requirements: string;

    @Property()
    employerDetails: string;

    @Property()
    date: string;

    @Property()
    employer: string;

    @Property()
    city: string;

    @Property()
    salary: string;

    @Property()
    domain: string;
}

