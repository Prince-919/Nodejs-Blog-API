import express from "express";
import {
  register,
  login,
  users,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
import authMiddleware from "./../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(authMiddleware, users);
router.route("/:id").delete(deleteUser);
router.route("/:id").put(updateUser);

export default router;
