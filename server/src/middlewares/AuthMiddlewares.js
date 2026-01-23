import JWT from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/userSchema.js";
import AuthRoles from "../utils/AuthRoles.js";

/* export const isLoggedIn = async (req, res, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      config.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in logged in functionality ${error}`,
    });
  }
}; */

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decode = JWT.verify(token, config.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== AuthRoles.ADMIN) {
      res.status(401).json({
        success: false,
        message: "unauthorized user",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in admin login functionality ${error}`,
    });
  }
};

export const isSeller = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== AuthRoles.SELLER) {
      res.status(401).json({
        success: false,
        message: "unauthorized user",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in seller login functionality ${error}`,
    });
  }
};
