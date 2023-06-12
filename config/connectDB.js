import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose
            .set("strictQuery", true)
            .connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log("Successfully connected to database");
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

export default connectDB;