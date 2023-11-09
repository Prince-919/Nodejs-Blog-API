import { UserModel } from "../models/index.js";
import { appError, getTokenFromHeader, verifyToken } from "./../utils/index.js";

const isAdmin = async (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = verifyToken(token);
  req.userAuthId = decodedUser.id;
  const user = await UserModel.findById(decodedUser.id);
  if (user.isAdmin) {
    return next();
  } else {
    return next(appError("Access denied, Admin Only", 403));
  }
};

export default isAdmin;
