export class CreateJobDto {
    readonly type: string;
    readonly description: string;
    readonly requirements: string;
    readonly date: string;
    readonly employer: string;
    readonly city: string;
    readonly salary: string;
    readonly domain: string;
}
