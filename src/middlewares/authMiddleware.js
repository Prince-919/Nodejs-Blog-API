import { getTokenFromHeader, verifyToken } from "./../utils/index.js";

const authMiddleware = async (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = verifyToken(token);
  req.userAuthId = decodedUser.id;
  if (!decodedUser) {
    return res.json({
      message: "Invalid/Expired token , please login again",
    });
  } else {
    next();
  }
};

export default authMiddleware;
