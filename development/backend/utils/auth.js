import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const encrypt = (password) => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (userName, role, userId) => {
  const token = jwt.sign({ userName, role, userId }, process.env.KEY, {
    expiresIn: "365d",
  });
  return token;
};

export const jwtVerification = (req, res, next) => {
  const authHeaders = req.headers["authorization"];

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(409).send("Missing authorization headers");
  }

  const token = authHeaders.split(" ")[1];
  const decode = jwt.verify(token, process.env.KEY);

  if (decode.role !== process.env.ROLE) {
    return res.status(409).send("Missing autherization");
  }
  req.token = decode;
  next();
};
