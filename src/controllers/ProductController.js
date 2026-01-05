import { log } from "console";
import Product from "../models/productsSchema.js";
import fs from "fs";

export const createProduct = async (req, res) => {
  try {
    //! get info from the front end
    //* as we have installed formidable we will grab all the non file fields from req.fields instead of req.body
    // validation 1
    const {
      name,
      description,
      price,
      quantity,
      stock,
      sold,
      shipping,
      collection,
    } = req.fields;
    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !stock ||
      !sold ||
      !shipping ||
      !collection
    ) {
      return res.status(400).json({
        success: false,
        message: "please fill the product fields",
      });
    }
    // validation 2
    const { photo } = req.files;
    if (!photo && photo.size > 1000000) {
      return res.status(500).json({
        success: false,
        message: "photo is required and should be less than 1mb",
      });
    }
    // check if the product name is already existing in the db
    const existingProduct = await Product.findOne({ name });
    // if existing send response to the user
    if (existingProduct) {
      return res.status(200).json({
        success: false,
        message: `you have already have an product`,
      });
    }
    // if doesnt exist create a new product
    const products = new Product({ ...req.fields });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).json({
      success: true,
      message: `product has been created successfully`,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in creating product functionality ${error}`,
      error,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("collection")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    // validation
    if (!products) {
      return res.status(404).json({
        success: false,
        message: `error in getting the products`,
      });
    }
    res.status(200).json({
      success: true,
      count: products.length,
      message: `products has been fecthed successfully`,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in getting a product functionality ${error}`,
      error,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params._id })
      .populate("collection")
      .select("-photo");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `no product found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `single product has been fetched successfully`,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in getting a single product functionality ${error}`,
      error,
    });
  }
};

export const getProductImage = async (req, res) => {
  try {
    const productImg = await Product.findById(req.params.id).select("photo");
    if (productImg.photo.data) {
      res.set("Content-type", productImg.photo.contentType);
      return res.status(200).send(productImg.photo.data);
    }
    /* if (!productImg) {
      return res.status(404).json({
        success: false,
        message: `product not found`,
      });
    }
    if (productImg.photo || !productImg.photo.data) {
      return res.status(404).json({
        success: false,
        message: `no photo found on this product`,
      });
    }
    res.set("Content-type", productImg.photo.contentType);
    return res.status(200).json(productImg.photo.data); */
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in getting a product image functionality ${error}`,
      error,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      stock,
      sold,
      shipping,
      collection,
    } = req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(500)({ error: "Name is required" });
      case !description:
        return res.status(500)({ error: "Description is required" });
      case !price:
        return res.status(500)({ error: "Price is required" });
      case !quantity:
        return res.status(500)({ error: "Quantity is required" });
      case !stock:
        return res.status(500)({ error: "Stock is required" });
      case !sold:
        return res.status(500)({ error: "Number of Sold is required" });
      case !shipping:
        return res.status(500)({ error: "Shipping details is required" });
      case !collection:
        return res.status(500)({ error: "A Collection set is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .json({ error: "Photo is required and should be less than 1mb" });
    }
    const editproduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    if (photo) {
      editproduct.photo.data = fs.readFileSync(photo.path);
      editproduct.photo.contentType = photo.type;
    }
    res.status(200).json({
      success: true,
      message: `product updated successfully`,
      editproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in updating a product ${error}`,
      error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id).select("-photo");
    res.status(201).json({
      success: true,
      message: `product deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in deleting a product ${error}`,
      error,
    });
  }
};

export const productFilter = async (req, res) => {
  try {
    const { checked, radio } = request.body;
    // we are getting the filter from the frontend and saving it in an object
    let args = {};
    // here we are using the theory from mongodb
    // gte (greater than or equal to)
    // lte (lesser than or equal to)
    // if collection is selected save to args if price is selected its ranges added to args
    if (checked.length > 0) args.collection = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in product filtering ${error}`,
      error,
    });
  }
};
