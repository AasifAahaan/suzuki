import mongoose, { Schema, Document } from "mongoose";

export interface IUserDocument extends Document {
    user: string,
    interest: string[],
    age: number,
    mobile: number,
    email: string,
}

const addUserSchema = new Schema<IUserDocument>({
    user: {
        type: String,
        required: true
    },
    interest: {
        type: [String],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });

export const User = mongoose.model<IUserDocument>('user', addUserSchema);