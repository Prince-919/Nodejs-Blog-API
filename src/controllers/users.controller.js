import bcrypt from "bcryptjs";
import { appError, generateToken, getTokenFromHeader } from "../utils/index.js";
import { UserModel } from "./../models/index.js";

export const register = async (req, res, next) => {
  try {
    const { firstname, lastname, profilePhoto, email, password } = req.body;
    const userFound = await UserModel.findOne({ email });
    if (userFound) {
      return next(appError(`User already ${email} exists`, 500));
    }
    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(new Error(error));
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await UserModel.findOne({ email });
    if (!userFound) {
      return res.json({
        message: "Invalid login credentials",
      });
    }
    const isMatchedPassword = await bcrypt.compare(
      password,
      userFound.password
    );
    if (!isMatchedPassword) {
      return res.json({
        message: "Invalid login credentials",
      });
    }

    res.json({
      status: "success",
      data: {
        firstname: userFound?.firstname,
        lastname: userFound?.lastname,
        email: userFound?.email,
        isAdmin: userFound?.isAdmin,
        token: generateToken(userFound?._id),
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userAuthId);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Delete User",
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Update User",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const profilePhotoUpload = async (req, res, next) => {
  try {
    const userToUpdate = await UserModel.findById(req.userAuthId);
    if (!userToUpdate) {
      return next(appError(`${userToUpdate} - user not found`, 403));
    }
    if (userToUpdate?.isBlocked) {
      return next(appError("Action not allowed, your account is blocked", 403));
    }
    if (req.file) {
      await UserModel.findByIdAndUpdate(
        req.userAuthId,
        {
          $set: {
            profilePhoto: req?.file?.path,
          },
        },
        { new: true }
      );
      res.json({
        status: "success",
        data: "you have successfully updated your profile photo",
      });
    }
  } catch (error) {
    next(appError(error.message, 500));
  }
};
