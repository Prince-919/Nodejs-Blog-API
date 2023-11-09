import express from "express";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  singleCategory,
  updateCategory,
} from "../controllers/categories.controller.js";
import { authMiddleware } from "./../middlewares/index.js";
const router = express.Router();

router.route("/").post(authMiddleware, createCategory);
router.route("/").get(fetchCategories);
router.route("/:id").get(singleCategory);
router.route("/:id").delete(authMiddleware, deleteCategory);
router.route("/:id").put(authMiddleware, updateCategory);

export default router;
