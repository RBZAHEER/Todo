import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js"; // Correct the import path for User model

export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }
    req.user = user; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};
