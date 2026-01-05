import express from "express";
import {
  createProduct,
  getAllProduct,
  getSingleProduct,
  getProductImage,
  updateProduct,
  deleteProduct,
  productFilter,
} from "../controllers/ProductController.js";
import formidable from "express-formidable";
import { isAdmin, isLoggedIn } from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

//! create product || method:post
router.post(
  "/create-product",
  isLoggedIn,
  isAdmin,
  formidable(),
  createProduct
);

//! get all products || method:get
router.get("/get-all-products", getAllProduct);

//! get filtered products || method:post
router.post("/product/product-filter", productFilter);

//! delete products || method:delete
router.delete("/delete-product/:id", isLoggedIn, isAdmin, deleteProduct);

//! get single products || method:get
router.get("/get-single-product/:id", getSingleProduct);

//! get product image || method:get
router.get("/get-product-image/:id", getProductImage);

//! updates products || method:put
router.put(
  "/update-product/:id",
  isLoggedIn,
  isAdmin,
  formidable(),
  updateProduct
);

export default router;
