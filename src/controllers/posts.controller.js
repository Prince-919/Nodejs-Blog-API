import { PostModel, UserModel } from "../models/index.js";
import { appError } from "./../utils/index.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    const author = await UserModel.findById(req.userAuthId);
    if (author.isBlocked) {
      return next(appError("Access denied, account blocked", 403));
    }
    const postCreated = await PostModel.create({
      title,
      description,
      user: author._id,
      category,
    });
    author.posts.push(postCreated._id);
    await author.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const singlePost = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "fetched post",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const allPost = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "fetched posts",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const deletePost = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Delete posts",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const updatePost = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Update posts",
    });
  } catch (error) {
    res.json(error.message);
  }
};
