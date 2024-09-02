import mongoose from "mongoose";
import { _DB_Name } from "../constants/constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${_DB_Name}`
    );
    console.log(
      `\nMongoDB Connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB Connection Error ===> ", error);
    process.exit(1);
  }
};

export default connectDB;
