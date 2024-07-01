import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(
      errorHandler(400, "Username, email, and password are required")
    );
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "This email is already in use"));
    }

    const user = await User.create({ username, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const { password: userPassword, ...userWithoutPassword } = user._doc;

    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .json({
        status: "success",
        message: "User created successfully",
        user: userWithoutPassword,
      });
  } catch (error) {
    next(error);
  }
};

//Sing-in
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email }).select("+password");
    if (!validUser) {
      return next(errorHandler(400, "User not found"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid email or password"));
    }

    const token = jwt.sign({ id: validUser._id,isAdmin:validUser.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const { password: userPassword, ...userWithoutPassword } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .json({ success: true, token, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (validUser) {
      const token = jwt.sign({ id: validUser._id ,isAdmin:validUser.isAdmin}, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      console.log(token);

      const { password: userPassword, ...userWithoutPassword } = validUser._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        })
        .json({ success: true, user: userWithoutPassword });
    } else {
      const password = Math.random().toString(36).slice(-8);

      const user = await User.create({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(36).slice(-4),
        email,
        password,
        profilePicture: googlePhotoUrl,
      });

      if (user) {
        const token = jwt.sign({ id: user._id,isAdmin:user.isAdmin }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        console.log(token)
        const { password: userPassword, ...userWithoutPassword } = user._doc;

        res
          .status(201)
          .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          })
          .json({ success: true, user: userWithoutPassword });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    console.log("signout");
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Signout success" });
  } catch (error) {
    next(error);
  }
};
