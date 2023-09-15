import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: "./config.env" });
// const url: string | number = `mongodb+srv://robincyril:ail1234@cluster0.kxr7ya7.mongodb.net/TOROFX`; // Cast process.env.DATABASE to string
// mongoose
//   .connect(url)
//   .then(() => console.log("Successfully connected to Database!"))
//   .catch((err: any) => console.log(err));
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    username: String,
    password: String
});
export const userModel = mongoose.model("TOROFX", userSchema);
