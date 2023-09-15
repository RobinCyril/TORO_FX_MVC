import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: "./config.env" });
export const connectDB = () => {
    const url = `mongodb+srv://robincyril:ail1234@cluster0.kxr7ya7.mongodb.net/TOROFX`;
    mongoose
        .connect(url)
        .then(() => console.log("Successfully connected to Database!"))
        .catch((err) => console.log(err));
};
