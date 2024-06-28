import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "Hi" });
};

export const update = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  try {
    const updateData = {};
    console.log("yooooooo")
    // Validate and hash password if provided
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(
          errorHandler(400, "Password must be at least 6 characters")
        );
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      updateData.password = hashedPassword;
    }

    // Validate username if provided
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(
          errorHandler(400, "Username must be between 7 and 20 characters")
        );
      }

      if (req.body.username.includes(" ")) {
        return next(errorHandler(400, "Username cannot contain spaces"));
      }

      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, "Username must be lowercase"));
      }

      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          errorHandler(400, "Username can only contain letters and numbers")
        );
      }

      updateData.username = req.body.username;
    }

    // Add other fields if provided
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.profilePicture)
      updateData.profilePicture = req.body.profilePicture;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: updateData,
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
