import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 30000 
    });
    console.log(`mongodb connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`mongodb server issue:${error}`);
  }
};

