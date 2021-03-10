import * as mongoose from 'mongoose';

export const JobSchema = new mongoose.Schema({
    type: String,
    description: String,
    requirements: String,
    date: String,
    employer: String,
    city: String,
    salary: String,
    domain: String,
});
