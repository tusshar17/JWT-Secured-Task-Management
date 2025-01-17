import mongoose from "mongoose";

const connectDB = async (DB_URL) => {
    try {
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("DB connection successfull.");
    } catch (error) {
        console.log("DB connection failed!");
        console.log(error);
    }
}

export default connectDB