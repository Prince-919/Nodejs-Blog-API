import express from "express";
import storage from "../config/cloudinary.config.js";
import multer from "multer";
import {
  allPost,
  createPost,
  deletePost,
  singlePost,
  toggleDisLikePost,
  toggleLikePost,
  updatePost,
} from "../controllers/posts.controller.js";
import { authMiddleware } from "./../middlewares/index.js";

const router = express.Router();

// storage
const upload = multer({ storage });

router.route("/").post(authMiddleware, upload.single("image"), createPost);
router.route("/").get(authMiddleware, allPost);
router.route("/:id").get(authMiddleware, singlePost);
router.route("/likes/:id").get(authMiddleware, toggleLikePost);
router.route("/dislikes/:id").get(authMiddleware, toggleDisLikePost);
router.route("/:id").delete(authMiddleware, deletePost);
router.route("/:id").put(authMiddleware, upload.single("image"), updatePost);

export default router;
