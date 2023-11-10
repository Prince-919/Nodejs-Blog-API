import express from "express";
import { authMiddleware } from "./../middlewares/index.js";
import {
  createComment,
  deleteComment,
  updateComment,
} from "./../controllers/comments.controller.js";

const router = express.Router();

router.route("/:id").post(authMiddleware, createComment);
router.route("/:id").delete(authMiddleware, deleteComment);
router.route("/:id").put(authMiddleware, updateComment);

export default router;
