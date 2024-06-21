import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      lowercase: [true, "Username should be in lowercase"],
      unique: true,
      minlength: [4, "Username should be at least 4 characters long"],
      maxlength: [12, "Username should be at most 12 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password should be at least 4 characters long"],
      select: false,
    },
  },
  { timestamps: true }
);

//hash password brfore saving
userSchema.pre('save', async function(next) {
      this.password = await bcrypt.hash(this.password, 12);
    next();
  });

const User = mongoose.model("User", userSchema);

export default User;
