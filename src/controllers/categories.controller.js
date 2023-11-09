import { appError } from "../utils/index.js";
import { CategoryModel } from "./../models/index.js";

// CREATE Category
export const createCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const category = await CategoryModel.create({
      title,
      user: req.userAuthId,
    });
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// FETCH Categories
export const fetchCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();
    res.json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// SINGLE Category
export const singleCategory = async (req, res, next) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// DELETE Category
export const deleteCategory = async (req, res, next) => {
  try {
    await CategoryModel.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Category deleted successfully",
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// UPDATE Category
export const updateCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
      },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};
