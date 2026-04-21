import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("Using existing database connection");
        return mongoose.connection;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Connecting to: ${process.env.MONGO_URI.split('@')[1]}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database Name: ${conn.connection.name}`);
        
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB