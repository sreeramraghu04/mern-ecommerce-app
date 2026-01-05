import Collection from "../models/collectionSchema.js";
import slugify from "slugify";

export const createCollection = async (req, res) => {
  try {
    //* get info from the frontend
    // validate
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: `please provide a collection name`,
      });
    }
    // check if the collection name is already existing in the db
    const existingCollection = await Collection.findOne({ name });
    // if existing send response to the user
    if (existingCollection) {
      return res.status(200).json({
        success: false,
        message: `you have already have an collection`,
      });
    }
    // if doesnt exist create a new collection
    const collection = await Collection.create({ name, slug: slugify(name) });
    return res.status(201).json({
      success: true,
      message: `collection has been created successfully`,
      collection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in create collection functionality ${error}`,
      error,
    });
  }
};

export const getAllCollection = async (req, res) => {
  try {
    const collection = await Collection.find({});
    res.status(200).json({
      success: true,
      count: collection.length,
      message: `successfully fetched the collection`,
      collection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in getting the collection functionality ${error}`,
      error,
    });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collectionToDelete = await Collection.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: `collection deleted successfully`,
      collectionToDelete,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in deleting a collection functionality ${error}`,
      error,
    });
  }
};

export const getSingleCollection = async (req, res) => {
  try {
    const singleCollection = await Collection.findOne({
      slug: req.params.slug,
    });
    res.status(200).json({
      success: true,
      message: `single collection fetched successfully`,
      singleCollection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in getting single collection functionality ${error}`,
      error,
    });
  }
};

export const updateCollection = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const updateCollection = await Collection.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: `updates collection successfully`,
      updateCollection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in updating a collection functionality ${error}`,
      error,
    });
  }
};
