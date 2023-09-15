import {categoryModel} from '../model/category.js';
import {Library} from '../model/library.js';
import multer from 'multer';
import path from 'path';

export const get_video=(req, res) => {
    Library
      .find()
      .then((data) => {
        res.render("Library", { data: data });
      })
      .catch((err) => console.log(err));
  };


  export const get_library_upload=(req, res) => {
    categoryModel
      .find()
      .then((data) => {
        res.render("library-upload", { data: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("An error occurred");
      });
  };

//------------Post API for adding videos--------------------------

const FileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "application/pdf",
    "image/jpg",
    "image/jpeg",
    "image/png",
    "video/mp4",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./assets/photos");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage, fileFilter: FileFilter });

export const add_video = (req, res) => {
  const { file_name, category } = req.body;

  // Access the uploaded files from the request object
  const files = req.files;

  // Check if the files are uploaded and available in the files object
  if (!files || !files.video || !files.photo) {
    res.status(400).json({ error: "Both video and photo are required." });
    return;
  }

  // Access the file paths for further processing
  const videoPath = path.basename(files.video[0].path);
  const photoPath = path.basename(files.photo[0].path);

  // Create a new Library instance with the file information
  const addLibrary = new Library({
    file_name,
    category,
    video: videoPath,
    photo: photoPath,
  });

  addLibrary
    .save()
    .then(() => {
      console.log("Successfully added the course.");
      res.status(200).json({ message: "Course Added" });
    })
    .catch((err) => {
      console.error(err); // Use 'console.error' for error logging
      res.status(500).json({ error: "An error occurred while saving the course." });
    });
};



export const get_update_video= async (req, res) => {
    try {
      const categoryData = await categoryModel.find().exec();
      const libraryData = await Library.findById(req.params.id).exec();
  
      if (!categoryData || !libraryData) {
        return res.status(404).send("Data not found");
      }
  
      res.render("library-edit", { categoryData: categoryData, libraryData: libraryData });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  };
  
  
