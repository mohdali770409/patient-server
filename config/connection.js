import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    if (connection) {
      console.log("connected to database");
    }
  } catch (error) {
    console.log("error in connection", error);
  }
};
