export interface Job {
    type: string;
    description: string;
    requirements: string;
    date: string;
    employer?: string;
    city: string;
    salary?: string;
    domain: string;
}
