import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js"; // Correct the import path for User model

export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log("Token received:", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    // console.log("Token decoded:", decoded);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res.status(401).json({ message: "Invalid token." });
  }
};

// import jwt from "jsonwebtoken";
// import { User } from "../model/user.model.js";
// export const authenticate = async (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
//     req.user = await User.findById(decoded.userId);
//   } catch (error) {
//     return res.status(401).json({ message: "" + error.message });
//   }
//   next();
// };
