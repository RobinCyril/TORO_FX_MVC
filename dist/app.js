import express from "express";
import userRoute from './routers/user.js';
export const app = express();
// Define a router
const router = express.Router();


// Using middlewares
app.use("/user", userRoute);
app.set('view engine', 'ejs');
