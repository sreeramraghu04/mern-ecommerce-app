import express from "express";
import {
  createCollection,
  getAllCollection,
  getSingleCollection,
  updateCollection,
  deleteCollection,
} from "../controllers/CollectionController.js";
import {
  isLoggedIn,
  isAdmin,
} from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

//! create collection || method:post
router.post("/create-collection", isLoggedIn, isAdmin, createCollection);

//! get all collections || method:get
router.get("/get-all-collection", getAllCollection);

//! delete collections || method:delete
router.delete("/delete-collection/:id", isLoggedIn, isAdmin, deleteCollection);

//! get single collection || method:get
router.get("/get-single-collection/:slug", getSingleCollection);

//! update collection || method:put
router.put("/update-collection/:id", isLoggedIn, isAdmin, updateCollection);

export default router;
