import express from "express";
import {
  logIn,
  logOut,
  signUp,
  testController,
} from "../controllers/AuthControllers.js";
import { isLoggedIn, isAdmin } from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

//! signup || method:post
router.post("/signup", signUp);

//! login || method:post
router.post("/login", logIn);

//! logout || method:post
router.post("/logout", logOut);

//! testcontroller || method:get
router.get("/test", isLoggedIn, isAdmin, testController);

//! protected user routes || method:get
router.get("/user-auth", isLoggedIn, (req, res) => {
  res.status(200).json({
    okay: true,
  });
});

//! protected admin routes || method:get
router.get("/admin-auth", isLoggedIn, isAdmin, (req, res) => {
  res.status(200).json({
    okay: true,
  });
});

export default router;
