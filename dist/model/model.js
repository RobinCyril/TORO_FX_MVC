import mongoose from "mongoose";
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });

// const url = process.env.DATABASE; // Updated the variable name here
// mongoose
//   .connect(url, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("Successfully connected to Database!"))
//   .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
  
  fname: {
    type: String,
    // required: true
  },
  lname: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true
  },
  username: {
    type: String,
    // required: true
  },
  password: {
    type: String,
    // required: true
  },
  Photo: String,
  token: {
    type: String
  },
});

export const userModel = mongoose.model("TOROFX_", userSchema);

