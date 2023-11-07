import express from "express";
import storage from "../config/cloudinary.config.js";
import {
  register,
  login,
  userProfile,
  updateUser,
  deleteUser,
  profilePhotoUpload,
} from "../controllers/users.controller.js";
import { authMiddleware } from "./../middlewares/index.js";
import multer from "multer";

const upload = multer({ storage });

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(authMiddleware, userProfile);
router.route("/:id").delete(deleteUser);
router.route("/:id").put(updateUser);
router
  .route("/profile-photo-upload")
  .post(authMiddleware, upload.single("profile"), profilePhotoUpload);

export default router;
