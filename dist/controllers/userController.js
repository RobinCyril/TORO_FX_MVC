var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
// const router =express.Router();
import bcrypt from "bcrypt";
import { userModel } from "../model/userModel.js"; // Import your user model here
import { user } from "../model/user.js";
import { Chapter } from "../model/chapter.js";
import multer from "multer";
// Registration

export const auth_register = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { fname, lname, email, username, password } = req.body;
      // Check if the email already exists
      const existingUser = yield userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = yield bcrypt.hash(password, saltRounds);
      // Create a new user document
      const newUser = new userModel({
        fname,
        lname,
        email,
        username,
        password: hashedPassword, // Store the hashed password
      });
      // Save the user document
      yield newUser.save();
      res.status(200).json({ message: "Registration successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Internal error" });
    }
  });
export const get_auth_register = (req, res) => {
  res.render("get_auth_register");
};

// Login
export const get_auth_login = (req, res) => {
  res.render("auth_login");
};

// index page
export const index = (req, res) => {
  res.render("index");
};

// subscriber/user page
export const subscribers = (req, res) => {
  user
    .find()
    .then((data) => {
      res.render("subscribers", { data: data });
    })
    .catch((err) => console.log(err));
};

// support page
export const support = (req, res) => {
  res.render("support");
};

// risk calculator
export const calculator = (req, res) => {
  res.render("calculator");
};

export const app_chat = (req, res) => {
  userModel
    .findOne(req.user)
    .then((data) => res.render("app-chat", { data: data }))
    .catch((err) => console.log(err));
};
//

export const Charts = (req, res) => {
  res.render("Charts");
};

export const get_static_chart = (req, res) => {
  res.render("static-charts");
};

export const admin_profile = (req, res) => {
  // res.send();
  const id = req.user;
  console.log(id);
  userModel
    .findOne(id)
    .then((data) => {
      res.render("admin-profile", { data: data });
      // console.log(data);
    })
    .catch((err) => console.log(err));
};

const filter1 = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/svg"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage3 = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./assets/profile");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload3 = multer({ storage: storage3, fileFilter: filter1 });
export const update_admin_profile = async (req, res) => {
  const { id } = req.params;
  // const { password } = req.body;

  try {
    // Hash the new password
    // const hashedPassword = bcrypt.hashSync(password, 10);

    // Construct the update object
    const updatedUser = {
      // pass: hashedPassword,
      fname: req.body.fname,
      username: req.body.username,
      email: req.body.email,
      Photo: req.file.filename,
    };

    // Find the user by ID and update the fields
    await userModel.findByIdAndUpdate(id, { $set: updatedUser });

    res.status(200).json({ message: "Successfully updated!", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
// Profile update ends
//------------Post API for Adding User--------------------------

export const get_user_profile= (req, res) => {
  const id = req.params.id;
  console.log(id);
  user
    .findById({ _id: id })
    .then((data) => {
      res.render("user-profile", { data: data }); // Include the data in the render call
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred");
    });
};


const fileFilter2 = (req, file, cb) => {
  const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage4 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/user");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const add_new_user = async (req, res) => {
  try {
    const upload4 = multer({
      storage: storage4,
      fileFilter: fileFilter2,
    }).single("photo");

    upload4(req, res, async (err) => {
      if (err) {
        console.error("Error occurred while uploading file:", err);
        return res.status(400).json({ err: "File upload error" });
      }

      const { username, email, mob, status, achievement, location, pro, program } = req.body;
      const photo = req.file;
      console.log("Received data from the form:", req.body);

      // Rename the variable to avoid the naming conflict
      const existingUser = await user.findOne({ email: email });
      console.log("User found in the database:", existingUser);

      if (existingUser) {
        console.log("User already exists!");
        // return res.status(400).send("User already exists!");
        return res.render("user-profile.ejs");
      }

      const register1 = new user({
        status,
        pro,
        program,
        email,
        username,
        location,
        mob,
        achievement,
        photo: photo ? photo.filename : null,
      });

      await register1.save();

      console.log("User registered successfully!");
      return res.status(200).json({ message: "Registration successful" });
    });
  } catch (err) {
    console.error("Error occurred while processing registration:", err);
    return res.status(500).json({ err: "Internal server error" });
  }
};
