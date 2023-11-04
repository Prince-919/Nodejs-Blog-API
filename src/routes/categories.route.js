import express from "express";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.route("/").post(createCategory);
router.route("/:id").delete(deleteCategory);
router.route("/:id").put(updateCategory);

export default router;
