import express from "express";
import {
  createComment,
  deleteComment,
  singleComment,
  updateComment,
} from "./../controllers/comments.controller.js";

const router = express.Router();

router.route("/").post(createComment);
router.route("/:id").get(singleComment);
router.route("/:id").delete(deleteComment);
router.route("/:id").put(updateComment);

export default router;
