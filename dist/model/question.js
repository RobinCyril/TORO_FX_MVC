const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
url = process.env.DATABASE;

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const userSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  option1:{
    type: String,
    required: true,
  },
  option2:{
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  option4: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  ch_id:String
});

const question = mongoose.model("question", userSchema);
module.exports = question;
