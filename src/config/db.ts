import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI as string); 
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;