import mongoose from "mongoose";

const URI = process.env.MONGODB_URI


export const connectDb = async(req,res) => {
    try {
        await mongoose.connect(URI);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection Failed !!");
    }
}

