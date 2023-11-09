import bcrypt from "bcryptjs";
import { appError, generateToken, getTokenFromHeader } from "../utils/index.js";
import { UserModel } from "./../models/index.js";

// REGISTER
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

// LOGIN
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
// WHO VIEWED BY PROFILE
export const whoViewedByProfile = async (req, res, next) => {
  try {
    // step 1 - find the original user
    const user = await UserModel.findById(req.params.id);
    // step 2 - find the user who viewed the original user
    const userWhoViewed = await UserModel.findById(req.userAuthId);

    // step 3 - check if original and who viewed are found
    if (user && userWhoViewed) {
      //step 4 - check if userWhoViewed is already in the users viewers array
      const isUserAlreadyViewed = user?.viewers?.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toString()
      );
      if (isUserAlreadyViewed) {
        return next(appError("You already viewed this profile"));
      } else {
        //step 5 - push the userWhoViewed to the user's viewers array
        user.viewers.push(userWhoViewed._id);
        //step 6 - save the user
        await user.save();
      }
    }
    res.json({
      status: "success",
      message: "You have successfully viewed this profile",
    });
  } catch (error) {
    req.json(error.message);
  }
};

// Following
export const following = async (req, res, next) => {
  try {
    // step 1 - find the user to follow
    const userToFollow = await UserModel.findById(req.params.id);
    //step 2 - find the user who is following
    const userWhoFollowed = await UserModel.findById(req.userAuthId);
    // step 3 - check if user userWhoFollowed are found
    if (userToFollow && userWhoFollowed) {
      // step 4 - check if uerWhoFollowed is already in the user's followers array
      const isUserAlreadyFollowed = userToFollow?.following?.find(
        (follower) => follower.toString() === userWhoFollowed._id.toString()
      );
      if (isUserAlreadyFollowed) {
        return next(appError("You already follow this user"));
      } else {
        //step 5 - push the userWhoViewed to the user's viewers array
        userToFollow.followers.push(userWhoFollowed._id);
        // step 5 - push userToFollowed to the userWhoFollowed's following array
        userWhoFollowed.following.push(userToFollow._id);
        //step 6 - save the user
        await userWhoFollowed.save();
        await userToFollow.save();
        res.json({
          status: "success",
          message: "You have successfully followed this user",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

// UnFollow
export const unFollow = async (req, res, next) => {
  try {
    const userToBeUnFollow = await UserModel.findById(req.params.id);
    const userWhoUnFollow = await UserModel.findById(req.userAuthId);
    if (userToBeUnFollow && userWhoUnFollow) {
      const isUserAlreadyFollowed = userToBeUnFollow.followers.find(
        (follower) => follower.toString() === userWhoUnFollow._id.toString()
      );
      if (!isUserAlreadyFollowed) {
        return next(appError("You have not followed this user"));
      } else {
        // Remove userWhoUnFollow from the user's followers array
        userToBeUnFollow.followers = userToBeUnFollow.followers.filter(
          (follower) => follower.toString() !== userWhoUnFollow._id.toString()
        );
        await userToBeUnFollow.save();

        // Remove userWhoUnFollow from the userWhoUnFollow's following array
        userWhoUnFollow.following = userWhoUnFollow.following.filter(
          (following) =>
            following.toString() !== userToBeUnFollow._id.toString()
        );
        await userWhoUnFollow.save();
        res.json({
          status: "success",
          message: "You have successfully unfollowed this user",
        });
      }
    }
  } catch (error) {
    req.json(error.message);
  }
};

// Block User
export const block = async (req, res, next) => {
  try {
    const userToBeBlocked = await UserModel.findById(req.params.id);
    const userWhoBlocked = await UserModel.findById(req.userAuthId);
    if (userToBeBlocked && userWhoBlocked) {
      const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeBlocked._id.toString()
      );
      if (isUserAlreadyBlocked) {
        return next(appError("You already blocked this user"));
      } else {
        userWhoBlocked.blocked.push(userToBeBlocked._id);
        await userWhoBlocked.save();
        res.json({
          status: "success",
          message: "you have successfully blocked this user",
        });
      }
    }
  } catch (error) {
    req.json(error.message);
  }
};

// UnBlock
export const unBlock = async (req, res, next) => {
  try {
    const userToBeUnBlocked = await UserModel.findById(req.params.id);
    const userWhoUnBlocked = await UserModel.findById(req.userAuthId);
    if (userToBeUnBlocked && userWhoUnBlocked) {
      const isUserAlreadyUnBlocked = userWhoUnBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeUnBlocked._id.toString()
      );
      if (isUserAlreadyUnBlocked) {
        return next(appError("you have not blocked this user"));
      } else {
        userWhoUnBlocked.blocked = userWhoUnBlocked.blocked.filter(
          (blocked) => blocked.toString() !== userToBeUnBlocked._id.toString()
        );
        await userWhoUnBlocked.save();
        res.json({
          status: "success",
          message: "you have successfully unblocked this user",
        });
      }
    }
  } catch (error) {
    req.json(error.message);
  }
};

// admin block
export const adminBlock = async (req, res) => {
  try {
    const userToBeBlocked = await UserModel.findById(req.params.id);
    if (!userToBeBlocked) {
      return next(appError("User not found"));
    }
    userToBeBlocked.isBlocked = true;
    await userToBeBlocked.save();
    res.json({
      status: "success",
      message: "you have successfully blocked this user",
    });
  } catch (error) {
    req.json(error.message);
  }
};
// admin UnBlock
export const adminUnBlock = async (req, res) => {
  try {
    const userToBeUnBlocked = await UserModel.findById(req.params.id);
    if (!userToBeUnBlocked) {
      return next(appError("User not found"));
    }
    userToBeUnBlocked.isBlocked = false;
    await userToBeUnBlocked.save();
    res.json({
      status: "success",
      message: "you have successfully unblocked this user",
    });
  } catch (error) {
    req.json(error.message);
  }
};

// USERS
export const users = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json({
      status: "success",
      message: users,
    });
  } catch (error) {
    req.json(error.message);
  }
};

// USER PROFILE
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

// DELETE USER
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

// UPDATE USER
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

// PROFILE PHOTO UPLOAD
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
