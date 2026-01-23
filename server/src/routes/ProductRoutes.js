import express from "express";
import {
  createProduct,
  getAllProduct,
  getSingleProduct,
  getProductImage,
  updateProduct,
  deleteProduct,
  productFilter,
  productCount,
  productList,
  searchProduct,
  similarProduct,
  getProductsByCollection,
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
  createProduct,
);

//! delete product || method:delete
router.delete("/delete-product/:id", isLoggedIn, isAdmin, deleteProduct);

//! updates product || method:put
router.put(
  "/update-product/:id",
  isLoggedIn,
  isAdmin,
  formidable(),
  updateProduct,
);

//! get all products || method:get
router.get("/get-all-products", getAllProduct);

//! get single product || method:get
router.get("/get-single-product/:slug", getSingleProduct);

//! get product image || method:get
router.get("/get-product-image/:id", getProductImage);

//! filter products || method:post
router.post("/product-filter", productFilter);

//! get product count || method:get
router.get("/product-count", productCount);

//! get product list || method:get
router.get("/product-list/:page", productList);

//! search product || method:get
router.get("/search/:keyword", searchProduct);

//! get similar products || method:get
router.get("/similar-product/:pid/:cid", similarProduct);

//! products by collection || method:get
router.get(
  "/products-by-collection/:slug",getProductsByCollection
);

export default router;
