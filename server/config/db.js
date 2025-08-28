import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/todoapp";

  try {
    await mongoose.connect(uri);
    console.log(`✅ MongoDB connected: ${uri}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
