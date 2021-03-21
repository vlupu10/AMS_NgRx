import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/shared/base-entity.entity';

@Entity({
    collection: `applications`,
})
export class ApplicationModel extends BaseEntity{
    @Property()
    userId: string;

    @Property()
    jobId: string;

    @Property()
    resume: string;

    @Property()
    date: string;

}
