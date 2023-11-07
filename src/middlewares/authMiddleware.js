import { appError, getTokenFromHeader, verifyToken } from "./../utils/index.js";

const authMiddleware = async (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = verifyToken(token);
  req.userAuthId = decodedUser.id;
  if (!decodedUser) {
    return next(appError("Invalid/Expired token , please login again", 500));
  } else {
    next();
  }
};

export default authMiddleware;
