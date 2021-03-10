export interface IJob {
    _id: string;
    type: string;
    requirements: string;
    date: string;
    employer?: string;
    city: string;
    salary?: string;
    domain: string;
}

export class Job {
    // tslint:disable-next-line: variable-name
    _id?: string;
    type: string;
    domain: string;
    requirements: string;
    date: any;
    employer: string;
    city: string;
    salary: string;

    constructor(props: {
        _id?: string;
        type?: string;
        domain?: string;
        requirements?: string;
        date?: string;
        employer?: string;
        city?: string;
        salary?: string;
    } = {}) {
        this._id = props._id || '';
        this.type = props.type || '';
        this.domain = props.domain || '';
        this.requirements = props.requirements || '';
        this.date = props.date || new Date();
        this.employer = props.employer || '';
        this.city = props.city || '';
        this.salary = props.salary || '';
    }
}
