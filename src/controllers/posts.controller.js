import { PostModel, UserModel } from "../models/index.js";
import { appError } from "./../utils/index.js";

// Create Post
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
      photo: req?.file?.path,
    });
    author.posts.push(postCreated._id);
    await author.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

// Fetched All Post
export const allPost = async (req, res, next) => {
  try {
    const posts = await PostModel.find({})
      .populate("user")
      .populate("category", "title");

    const filteredPost = posts.filter((post) => {
      const blockedUsers = post.user.blocked;
      const isBlocked = blockedUsers.includes(req.userAuthId);
      return isBlocked ? null : post;
    });
    res.json({
      status: "success",
      data: filteredPost,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

// Single Post
export const singlePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id);
    // check if user viewed this post
    const isViewed = post.numViews.includes(req.userAuthId);
    if (isViewed) {
      res.json({
        status: "success",
        data: post,
      });
    } else {
      // push the user into number of views
      post.numViews.push(req.userAuthId);
      await post.save();
      res.json({
        status: "success",
        data: post,
      });
    }
  } catch (error) {
    next(appError(error.message));
  }
};

// Like Post
export const toggleLikePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id);
    const isLiked = post.likes.includes(req.userAuthId);
    if (isLiked) {
      post.likes = post.likes.filter(
        (like) => like.toString() !== req.userAuthId.toString()
      );
      await post.save();
    } else {
      post.likes.push(req.userAuthId);
      await post.save();
    }
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

// DisLike Post
export const toggleDisLikePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id);
    const isDisliked = post.disLikes.includes(req.userAuthId);
    if (isDisliked) {
      post.disLikes = post.disLikes.filter(
        (dislike) => dislike.toString() !== req.userAuthId.toString()
      );
      await post.save();
    } else {
      post.disLikes.push(req.userAuthId);
      await post.save();
    }
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

// Delete Post
export const deletePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.user.toString() !== req.userAuthId.toString()) {
      return next(appError("You are not allowed to delete this post", 403));
    }
    await PostModel.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Post deleted successfully",
    });
  } catch (error) {
    next(appError(error.message));
  }
};

// Update Post
export const updatePost = async (req, res, next) => {
  try {
    const { title, description, category, photo } = req.body;
    const post = await PostModel.findById(req.params.id);
    if (post.user.toString() !== req.userAuthId.toString()) {
      return next(appError("You are not allowed to delete this post", 403));
    }
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        photo: req?.file?.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appError(error.message));
  }
};
