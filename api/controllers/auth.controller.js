import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password) {
    return next(
      errorHandler(400, "Username, email, and password are required")
    );
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "This email is already in use"));
    }

    // Create a new user
    const user = await User.create({ username, email, password });

    // Optionally, you can exclude the password from the response
    const userWithoutPassword = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(201).json({
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

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Destructure to remove password from the user object
    const { password: userPassword, ...userWithoutPassword } = validUser._doc; // Rename the password variable

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ success: true, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};
