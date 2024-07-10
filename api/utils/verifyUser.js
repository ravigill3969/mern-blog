import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  console.log(req.cookies)
  console.log("verify token");
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    console.log("user", user);
    req.user = user;
    next();
  });
};

export const testreq = async (req, res, next) => {
  console.log((Math.random() * 1000).toFixed(0) * 1);
  // console.log(req.headers);
  console.log(req.cookies);
  console.log((Math.random() * 1000).toFixed(0) * 1);
  next();
};
