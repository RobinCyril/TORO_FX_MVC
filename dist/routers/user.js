import express from "express";
// user Passport middleware
import passport from "passport";

import {
  auth_register,
  get_auth_register,
  get_auth_login,
  calculator,
  index,
  subscribers,
  support,
  app_chat,
  Charts,
  get_static_chart,
  admin_profile,
  update_admin_profile,
  get_user_profile,
  add_new_user,
  get_new_assignment,
  add_new_assignment,
  logout,
  login,
  get_login_by_email,
  login_by_email,
  verify_link
} from "../controllers/userController.js";

import {
  category_upload,
  setting,
  create_category,
  get_course,
  get_course_upload,
  course_upload,
  get_course_edit,
  get_course_chapter,
  final_exam,
  upload_final_exam,
  get_assistant,
  get_chapter_edit,
  update_selected_chapter,
  get_add_chapter,
} from "../controllers/courseController.js";

import {
  get_video,
  get_library_upload,
  add_video,
  get_update_video,
} from "../controllers/videoController.js";

const router = express.Router();
//------------Post API for Registration--------------------------

router.post("/auth_register", auth_register);
//------------Get API for get_auth_register page --------------------------
router.get("/get_auth_register", get_auth_register);

//------------Get API for auth_login page --------------------------
router.get("/auth_login", get_auth_login);

router.post(
  "/login",
  passport.authenticate("local", { successRedirect: "/index" }),
  (req, res) => {
    res.json(req.user);
  }
);

router.get('/logout',logout);

router.get('/login',login);

router.get('/login-by-email', get_login_by_email);
router.post('/login-by-email',login_by_email);
router.post('/verify',verify_link);
//------------Get API for auth_login page --------------------------
router.get("/index", index);


//------------Get API for user/subsciber page --------------------------
router.get("/subscribers", subscribers);

//------------Get API for support page --------------------------
router.get("/support", support);

//------------Get API for Risk Calculation page --------------------------

router.get("/calculator", calculator);

//------------Get API for category_upload page --------------------------
router.get("/category-upload", category_upload);

router.get("/setting", setting);
//------------Post API for create_category page --------------------------
router.post("/createCategory", create_category);

// ---------Get API for course-page----------------------------------------
router.get("/course-page", get_course);

router.get("/course-upload", get_course_upload);

// ------------Post APIs for course ---------------------------------------
router.post("/course", course_upload);

router.get("/course-edit/:id", get_course_edit);

router.get("/course-chapter/:id", get_course_chapter);
router.get("/chapter-assignment/:id", get_new_assignment);
router.post("/submit-quiz/:id", add_new_assignment);

// ------------Get Api for Video Library------------
router.get("/library", get_video);

router.get("/library-upload", get_library_upload);

router.post("/add_video", add_video);

router.get("/library-edit/:id", get_update_video);

// ------------Get Api for Chat------------

router.get("/app-chat", app_chat);

// ------------Get Api for Charts------------
router.get("/Charts", Charts);

router.get("/static-charts", get_static_chart);

// ------------Get Api for Final Exam------------
router.get("/final", final_exam);
router.get("/final-exam-upload", upload_final_exam);
router.get("/assistant", get_assistant);

// ----------------------------Admin Profile----------------
router.get("/admin-profile", admin_profile);
router.post("/update/v1/:id", update_admin_profile);

// ----------------------------User/Subscriber Profile and Edit----------------
router.get("/user-profile/:id", get_user_profile);
router.post("/user-profile", add_new_user);
// ----------------------------Edit Chapter----------------
router.get("/chapter-edit/:id", get_chapter_edit);
router.post("/update-selected-chapters", update_selected_chapter);
router.get("/add_chapter/:cid", get_add_chapter);

export default router;
