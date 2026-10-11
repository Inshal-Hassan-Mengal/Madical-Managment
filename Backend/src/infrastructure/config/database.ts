import mongoose from 'mongoose';
import dns from 'dns';
import { env } from './env';

export const connectDatabase = async (): Promise<void> => {
  try {
    // Ensure Node uses public DNS resolvers for MongoDB Atlas SRV records
    dns.setServers(['8.8.8.8', '8.8.4.4']);

    await mongoose.connect(env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
