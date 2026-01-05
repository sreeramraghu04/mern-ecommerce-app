import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "collection is required"],
      trim: true,
      unique: true,
      maxLength: [20, "max char 20 letters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);
