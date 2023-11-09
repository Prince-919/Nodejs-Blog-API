import express from "express";
import storage from "../config/cloudinary.config.js";
import {
  register,
  login,
  userProfile,
  updateUser,
  deleteUser,
  profilePhotoUpload,
  users,
  whoViewedByProfile,
  following,
  unFollow,
  block,
  unBlock,
  adminBlock,
  adminUnBlock,
  updatePassword,
  deleteUserAccount,
} from "../controllers/users.controller.js";
import { authMiddleware } from "./../middlewares/index.js";
import multer from "multer";
import { isAdmin } from "../middlewares/index.js";

const upload = multer({ storage });
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(users);
router.route("/profile-viewers/:id").get(authMiddleware, whoViewedByProfile);
router.route("/following/:id").get(authMiddleware, following);
router.route("/unfollowing/:id").get(authMiddleware, unFollow);
router.route("/block/:id").get(authMiddleware, block);
router.route("/unblock/:id").get(authMiddleware, unBlock);
router.route("/admin-block/:id").put(authMiddleware, isAdmin, adminBlock);
router.route("/admin-unblock/:id").put(authMiddleware, isAdmin, adminUnBlock);
router.route("/profile").get(authMiddleware, userProfile);
router.route("/").put(authMiddleware, updateUser);
router.route("/update-password").put(authMiddleware, updatePassword);
router.route("/delete-account").delete(authMiddleware, deleteUserAccount);
router
  .route("/profile-photo-upload")
  .post(authMiddleware, upload.single("profile"), profilePhotoUpload);

export default router;
