import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string,);
    console.log("DB Connected");
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
};
export default connectDB;
