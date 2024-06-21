import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { config } from './config';


dotenv.config();
const url = config.MONGODB_URI;

if (!url) {
    console.error('❌ MongoDB connection string is not defined in the .env file');
    process.exit(1);
}

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(url);
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ Failed to connect to MongoDB', err);
        process.exit(1);
    }
};
