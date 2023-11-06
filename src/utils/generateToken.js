import JWT from "jsonwebtoken";

const generateToken = (id) => {
  const token = JWT.sign({ id }, process.env.JWT_KEY, { expiresIn: "7d" });
  return token;
};

export default generateToken;
