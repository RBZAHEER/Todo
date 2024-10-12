import { createTokenAndSaveCookies } from "../jwt/token.js";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: "All feilds are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });
    await newUser.save();

    if (newUser) {
      const token = await createTokenAndSaveCookies(newUser._id, res);
      res
        .status(201)
        .json({ message: "User Register Successfully" }, newUser, token);
    }
  } catch (error) {
    res.send(error.message);
  }
};
export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }
    const token = await createTokenAndSaveCookies(user._id, res);
    res
      .status(200)
      .json({ message: "User logged in successfully", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging user" });
  }
};
export const Logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging out user" });
  }
};
