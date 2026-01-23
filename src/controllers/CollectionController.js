import Collection from "../models/collectionSchema.js";
import slugify from "slugify";

//! create collection
export const createCollection = async (req, res) => {
  try {
    //* get info from the frontend
    // validate
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Collection name is required",
      });
    }

    // check if the collection name is already existing in the db
    const existingCollection = await Collection.findOne({ name });

    // if existing send response to the user
    if (existingCollection) {
      return res.status(200).json({
        success: false,
        message: "Collection already exists",
      });
    }

    // if doesnt exist create a new collection
    /* const collection = await Collection.create({ name, slug: slugify(name) }); */
    const collection = await new Collection({
      name,
      slug: slugify(name),
    }).save();

    return res.status(201).json({
      success: true,
      message: "Collection created successfully",
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

//! get all collection
export const getAllCollection = async (req, res) => {
  try {
    const collection = await Collection.find({});

    res.status(200).json({
      success: true,
      count: collection.length,
      message: `Collection fetched successfully`,
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

//! delete collection
export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collectionToDelete = await Collection.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: `Collection deleted successfully`,
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

//! delete collection (cgpt code givn lst)
/* export const deleteCollection = async (req, res) => {
  try {
    await Collection.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
}; */

//! get single collection
export const getSingleCollection = async (req, res) => {
  try {
    const singleCollection = await Collection.findOne({
      slug: req.params.slug,
    });

    if (!singleCollection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Collection fetched successfully",
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

//! update collection (norml code)
export const updateCollection = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const updateCollection = await Collection.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: "Collection updated successfully",
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

//! update collection (cgpt code givn lst)
/* export const updateCollection = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Collection name is required",
      });
    }

    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Collection updated successfully",
      collection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
}; */
