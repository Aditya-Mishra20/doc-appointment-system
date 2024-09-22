import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 30000 
    });
    console.log(`mongodb connected`);
  } catch (error) {
    console.error(`mongodb server issue:${error}`);
  }
};

