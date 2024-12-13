import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnecttion = async() => {
 await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err));
};
