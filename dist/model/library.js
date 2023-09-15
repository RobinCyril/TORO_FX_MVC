import mongoose from "mongoose";
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });

// const url = process.env.DATABASE;

// mongoose
//   .connect(url, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("successfully connected to Database!"))
//   .catch((err) => console.log(err));

const courseSchema = mongoose.Schema({
  file_name: {
    type: [String],
    // required:true
  },
  category: {
    type: [String],
  },
  Photo: [String],
  video: [String],
});

export const Library = mongoose.model("TOROFX_library", courseSchema);

