import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      maxLength: [25, "name should not exceed 25 chars"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "password should contain atleast 8 chars"],
      //* secured
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Phone no: is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
      trim: true,
      maxLength: [150, "Address should not exceeed 150 chars"],
    },

    role: {
      type: String,
      enum: Object.values.AuthRoles,
      default: "USER",
    },
  },
  { timestamps: true }
);

//! mongoose hook
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
});

//! schema methods
userSchema.methods = {
  //* compare password
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },
};

export default mongoose.model("User", userSchema);
