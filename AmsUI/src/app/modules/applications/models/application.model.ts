export interface IApplication {
    _id: string;
    userId: string;
    jobId: string;
    resume: string;
    date: string;
}

export class Application {
    // tslint:disable-next-line: variable-name
    _id?: string;
    userId?: string;
    jobId?: string;
    resume?: string;
    date?: any;

    constructor(props: {
        _id?: string;
        userId?: string;
        jobId?: string;
        resume?: string;
        date?: string;
    } = {}) {
        this._id = props._id || '';
        this.resume = props.resume || '';
        this.date = props.date || new Date();
        this.userId = props.userId || '';
        this.jobId = props.jobId || '';
    }

}
