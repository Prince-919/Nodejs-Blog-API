import express from "express";
import {
  allPost,
  createPost,
  deletePost,
  singlePost,
  updatePost,
} from "../controllers/posts.controller.js";
import { authMiddleware } from "./../middlewares/index.js";

const router = express.Router();

router.route("/").post(authMiddleware, createPost);
router.route("/:id").get(singlePost);
router.route("/").get(allPost);
router.route("/:id").delete(deletePost);
router.route("/:id").put(updatePost);

export default router;
