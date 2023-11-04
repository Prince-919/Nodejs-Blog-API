import express from "express";
import usersRoute from "./users.route.js";
import postsRoute from "./posts.route.js";
import categoriesRoute from "./categories.route.js";
import commentsRoute from "./comments.route.js";

const router = express.Router();

router.use("/users", usersRoute);
router.use("/posts", postsRoute);
router.use("/categories", categoriesRoute);
router.use("/comments", commentsRoute);

export default router;
