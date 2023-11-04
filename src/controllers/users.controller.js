import { UserModel } from "./../models/index.js";
export const register = async (req, res) => {
  try {
    const { firstname, lastname, profilePhoto, email, password } = req.body;
    const userFound = await UserModel.findOne({ email });
    if (userFound) {
      return res.json({
        message: "User already exists",
      });
    }
    // hashed password

    // create a new user
    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password,
    });
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
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

    const isMatchedPassword = await UserModel.findOne({ password });
    if (!isMatchedPassword) {
      return res.json({
        message: "Invalid login credentials",
      });
    }

    res.json({
      status: "success",
      data: "User LoggedIn",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const users = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "User Profile",
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
