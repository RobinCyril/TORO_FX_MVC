import { categoryModel } from "../model/category.js"; // Import your user model here
import { Course } from "../model/course.js";
import { Chapter } from "../model/chapter.js";
import { userModel } from "../model/userModel.js";
import multer from "multer";
import path from "path";
//  --------Course Category APIs--------------------------------
export const category_upload = (req, res) => {
  res.render("category-upload");
};

export const setting = (req, res) => {
  res.render("setting");
};

export const create_category = async (req, res) => {
  try {
    const category_data = await categoryModel.find();
    let checking = false;

    if (category_data.length > 0) {
      for (let i = 0; i < category_data.length; i++) {
        if (
          category_data[i].category.toLowerCase() ===
          req.body.category.toLowerCase()
        ) {
          checking = true;
          break;
        }
      }
    }

    if (checking) {
      return res.status(200).send({
        success: false,
        msg: "This category already exists.",
      });
    }
    const { category, category_id } = req.body;
    // Create a new category instance
    const newCategory = new categoryModel({
      category,
      category_id,
    });
    console.log(category);

    // Save the new category to the database
    const savedCategory = await newCategory.save();

    res.status(201).send({
      success: true,
      msg: "Category created successfully.",
      data: savedCategory,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      msg: error.message,
    });
  }
};

//   ---------------Get Course APIs ------------------
export const get_course = (req, res) => {
  Course.find()
    .then((data) => {
      res.render("course-page", { data: data });
    })
    .catch((err) => console.log(err));
};

export const get_course_upload = (req, res) => {
  res.render("course-upload");
};

//------------Post  API for adding course --------------------------

const FileFilter1 = (req, file, cb) => {
  const allowedFileTypes = [
    "application/pdf",
    "image/jpg",
    "image/jpeg",
    "image/png",
    // "video/mp4",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage1 = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./assets/course-list");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload1 = multer({ storage: storage1, fileFilter: FileFilter1 });

export const course_upload = upload1.fields([{ name: "photo" }], (req, res) => {
  const { file_name, price, duration } = req.body;
  console.log("started");
  // Access the uploaded files from the request object
  const files = req.files;
  console.log("Files:", files);

  // Check if the files are uploaded and available in the files object
  if (!files || !files.photo) {
    res.status(400).json({ error: "A photo is required." });
    return;
  }

  // Access the file paths for further processing
  const photoPath = path.basename(files.photo[0].path);

  // Assuming you have a Mongoose model called `library` for saving the file paths
  const courseMain = new Course({
    file_name,
    price,
    duration,
    Photo: photoPath,
  });

  courseMain
    .save()
    .then(() => {
      console.log("Successfully added the program..");
      // res.status(200).json({ message: "program Added" }),
      res.redirect("/course-page");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while saving the course." });
    });
});

// Course ends
//------------Get API for adding course --------------------------
export const get_course_edit = (req, res) => {
  // console.log(req.user._id);
  const id = req.params.id;
  Course.find({ _id: id })
    .then((data) => {
      res.render("course-edit", { data: data });
      // console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const get_course_chapter = (req, res) => {
  const courseId = req.params.id;

  // Assuming you have a courseChapter field in your chapter schema
  Chapter.aggregate([
    {
      $match: { cid: courseId }, // Filter chapters by courseChapter
    },
    {
      $lookup: {
        from: "TOROFX_courses", // Use the correct model or collection name
        localField: "cid",
        foreignField: "_id",
        as: "courseDetails", // Name for the new field containing course information
      },
    },
  ])
    .then((data) => {
      if (!data || data.length === 0) {
        res.redirect(`/course-chapter-upload/${courseId}`);
        console.log(`No chapters found for courseId: ${courseId}`);
        // return res.status(404).send("Chapters not found");
      }
      console.log("Course found:", data);
      res.render("course-chapter", { data: data });
    })
    .catch((error) => {
      console.log("Error:", error);
      res.status(500).send("Internal Server Error");
    });
};

export const final_exam = (req, res) => {
  userModel.find().then((data) => {
    res.render("final", { data: data });
  });
};

export const upload_final_exam = (req, res) => {
  res.render("final-exam-upload");
};

export const get_assistant = (req, res) => {
  res.render("assistant");
};

export const get_chapter_edit = (req, res) => {
  // console.log(req.user._id);
  const id = req.params.id;
  console.log(`course id is ${id}`);

  Chapter.find({ _id: id }).then((data) => {
      res.render("chapter-edit", { data: data });
      // console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};


export const update_selected_chapter = (req, res) => {
  const selectedChapterIds = req.body.selectedItems;

  // Check if video and Photo files exist in req.files
  if (!req.files || !req.files["video"] || !req.files["Photo"]) {
    res.status(400).json({ error: "Both video and Photo files are required." });
    return;
  }

  // Extract chapter_name and program and take the first element if they are arrays
  const updatedChapter = {
    chapter_name: Array.isArray(req.body.chapter_name)
      ? req.body.chapter_name[0]
      : req.body.chapter_name,
    program: Array.isArray(req.body.program)
      ? req.body.program[0]
      : req.body.program,
    video: req.files["video"][0].filename,
    Photo: req.files["Photo"][0].filename,
  };

  // Convert selectedChapterIds to an array if it's not already one
  const chapterIdsArray = Array.isArray(selectedChapterIds)
    ? selectedChapterIds
    : [selectedChapterIds];

  // Use Promise.all to update each chapter with its ID in parallel
  Promise.all(
    chapterIdsArray.map((chapterId) => {
      return Chapter.findByIdAndUpdate(chapterId, updatedChapter);
    })
  )
    .then(() => {
      res.send("Successfully updated selected Chapters!");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred while updating the Chapters.");
    });
};

export const get_add_chapter= (req, res) => {
  const cid = req.params.cid;
  console.log(`course id is ${cid}`);
  Chapter.find().then((data) => {
    res.render("course-chapter-upload", { data: data });
  });
};