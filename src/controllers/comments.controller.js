import { CommentModel, PostModel, UserModel } from "../models/index.js";
import { appError } from "./../utils/index.js";

export const createComment = async (req, res, next) => {
  try {
    const { description } = req.body;
    const post = await PostModel.findById(req.params.id);
    const comment = await CommentModel.create({
      post: post._id,
      description,
      user: req.userAuthId,
    });
    post.comments.push(comment._id);
    const user = await UserModel.findById(req.userAuthId);
    user.comments.push(comment._id);

    // Disable validation
    await post.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });
    res.json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    next(appError(error.message));
  }
};
export const singleComment = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Single comment",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (comment.user.toString() !== req.userAuthId.toString()) {
      return next(appError("You are not allowed to delete this comment", 403));
    }
    await CommentModel.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Comment has been deleted successfully",
    });
  } catch (error) {
    next(appError(error.message));
  }
};
export const updateComment = async (req, res, next) => {
  try {
    const { description } = req.body;
    const comment = await CommentModel.findById(req.params.id);
    if (comment.user.toString() !== req.userAuthId.toString()) {
      return next(appError("You are not allowed to update this comment", 403));
    }
    const category = await CommentModel.findByIdAndUpdate(
      req.params.id,
      { description },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    next(appError(error.message));
  }
};
