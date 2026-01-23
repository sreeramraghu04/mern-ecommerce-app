import mongoose from "mongoose";
import Collection from "./collectionSchema.js";

const productsSchema = new mongoose.Schema(
  {
    photo: {
      data: Buffer,
      contentType: String,
    },
    name: {
      type: String,
      required: [true, "product is required"],
      trim: true,
      unique: true,
      maxLength: [25, "max char 25 letters"],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: [50, "max char 50 letters"],
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Boolean,
      required: true,
    },
    collection: {
      type: mongoose.ObjectId,
      ref: Collection,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productsSchema);
