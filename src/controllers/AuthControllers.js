import User from "../models/userSchema.js";
import JWT from "jsonwebtoken";
import config from "../config/config.js";

const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

export const signUp = async (req, res) => {
  try {
    //* get info from frontend
    // validate it
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: `please fill the all fileds to sign-up`,
      });
    }
    // check if the the user already existing or not
    const existingUser = await User.findOne({ email });
    // if user exists sends response
    if (existingUser) {
      res.status(200).json({
        success: false,
        message: `you have already have an account please sign-in`,
      });
    }
    // if the user doesnt exist create a user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
    });
    user.password = undefined;
    res.status(201).json({
      success: true,
      message: `user has been created successfully`,
      user,
    });
  } catch (error) {
    console.log(error);
    // send error message to the user
    res.status(500).json({
      success: false,
      message: `error in signup functionality ${error}`,
      error,
    });
  }
};

//! login
// routes : /api/v1/auth/login
// description : login functionality
export const logIn = async (req, res) => {
  try {
    //* get info from frontend
    // validation
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `invalid email or password`,
      });
    }
    // check if the user existing in the database
    const user = await User.findOne({ email }).select("+password");
    // if user doesnt exist send response
    if (!user) {
      res.status(404).json({
        success: false,
        message: `user not found please signup`,
      });
    }
    // if user exists compare password
    const isPasswordMatched = await user.comparePassword(password);
    // if password doesnt match send response
    if (!isPasswordMatched) {
      res.status(400).json({
        success: false,
        message: `invalid password`,
      });
    }
    // if password match generate JWT (json web token)
    const token = JWT.sign(
      { _id: user._id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRY }
    );
    //* flush out password
    user.password = undefined;
    // set up cookie
    res.cookie("token", token, cookieOptions);

    // send success message to the user
    res.status(200).json({
      success: true,
      message: `user loged in successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in login functionality ${error}`,
    });
  }
};

//! logout
// routes : /api/v1/auth/logout
// description : logout functionality
export const logOut = async (req, res) => {
  try {
    //* remove generated token from the cookie
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    // send success message to the user
    res.status(200).json({
      success: true,
      message: `user loged out successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in logout functionality`,
    });
  }
};

//!test controller
export const testController = (req, res) => {
  res.send("protected route");
};
