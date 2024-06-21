import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email }).select("+password");
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({ message: error.message });
  }
};
