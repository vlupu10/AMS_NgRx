import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    passwordHash: String,
    email: String,
    phone: String,
    role: String,
    city: String,
    date: String,
});