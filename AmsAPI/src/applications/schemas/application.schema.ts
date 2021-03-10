import * as mongoose from 'mongoose';

export const ApplicationSchema = new mongoose.Schema({
    userId: String,
    jobId: String,
    resume: String,
    date: String,
});
