import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connection successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default dbConnect;
