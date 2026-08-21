import mongoose from "mongoose";

// Get the MongoDB connection URI from environment variables
const mongoURI = process.env.MONGODB_URL;

if (!mongoURI) {
  throw new Error("MONGODB_URL is not defined");
}

// Function to connect to the MongoDB database
export const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
