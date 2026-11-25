import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        const mongo_uri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/test';
        await connect(mongo_uri);
        console.log('mongo connected successfully');
    } catch (error) {
        console.log(error.message);
    }
};