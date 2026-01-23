import Product from "../models/productsSchema.js";
import fs from "fs";
import slugify from "slugify";
import Collection from "../models/collectionSchema.js";

//! create product (norml code)
/* export const createProduct = async (req, res) => {
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
}; */

//! create product (cgpt code 2)
export const createProduct = async (req, res) => {
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

    const { photo } = req.files || {};

    if (
      !name ||
      !description ||
      !collection ||
      price === undefined ||
      quantity === undefined ||
      stock === undefined ||
      sold === undefined ||
      shipping === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!photo) {
      return res.status(400).json({
        success: false,
        message: "Photo is required",
      });
    }

    if (photo.size > 1000000) {
      return res.status(400).json({
        success: false,
        message: "Photo should be less than 1MB",
      });
    }

    const product = new Product({
      name,
      slug: slugify(name, { lower: true }),
      description,
      price,
      quantity,
      stock,
      sold,
      shipping: shipping === "1",
      collection,
    });

    product.photo = {
      data: fs.readFileSync(photo.path),
      contentType: photo.type,
    };

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

//! create product (cgpt code 1)workd frst
/* export const createProduct = async (req, res) => {
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

    // validation
    if (
      !name ||
      !description ||
      price === undefined ||
      quantity === undefined ||
      stock === undefined ||
      sold === undefined ||
      shipping === undefined ||
      !collection
    ) {
      return res.status(400).json({
        success: false,
        message: "please fill the product fields",
      });
    }

    const { photo } = req.files || {};

    if (!photo) {
      return res.status(400).json({
        success: false,
        message: "photo is required",
      });
    }

    if (photo.size > 1000000) {
      return res.status(400).json({
        success: false,
        message: "photo should be less than 1MB",
      });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(200).json({
        success: false,
        message: "you already have this product",
      });
    }

    // ✅ CREATE PRODUCT WITH SLUG
    const product = new Product({
      ...req.fields,
      slug: slugify(name),
    });

    product.photo = {
      data: fs.readFileSync(photo.path),
      contentType: photo.type || photo.mimetype,
    };

    await product.save();

    res.status(201).json({
      success: true,
      message: "product has been created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in creating product functionality ${error}`,
      error,
    });
  }
}; */

//! get all products
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
        message: `error while fethcing the products`,
      });
    }
    res.status(200).json({
      success: true,
      count: products.length,
      message: `Products fecthed successfully`,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in get all products functionality ${error}`,
      error,
    });
  }
};

//! get single product (norml code) workng
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      /* const product = await Product.findById(req.params.id) */
      .select("-photo")
      .populate("collection");

    res.status(200).json({
      success: true,
      message: `Single product fetched successfully`,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in get single product functionality ${error}`,
      error,
    });
  }
};

//! get single product (cgpt code 1)
/* export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("collection");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
}; */

//! get product image (norml code)
// export const getProductImage = async (req, res) => {
//   try {
//     const productImg = await Product.findById(req.params.id).select("photo");
//     if (productImg?.photo?.data) {
//       res.set("Content-type", productImg.photo.contentType);
//       return res.status(200).send(productImg.photo.data);
//     }
//     if (!productImg?.photo?.data) {
//       return res.status(404).send("No image");
//     }

//     /* if (!productImg) {
//       return res.status(404).json({
//         success: false,
//         message: `product not found`,
//       });
//     }
//     if (productImg.photo || !productImg.photo.data) {
//       return res.status(404).json({
//         success: false,
//         message: `no photo found on this product`,
//       });
//     }
//     res.set("Content-type", productImg.photo.contentType);
//     return res.status(200).json(productImg.photo.data); */
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: `error in getting a product image functionality ${error}`,
//       error,
//     });
//   }
// };

//! get product image (cgpt code 1)
export const getProductImage = async (req, res) => {
  const product = await Product.findById(req.params.id).select("photo");

  if (!product?.photo?.data) return res.status(404).send("No image");

  res.set("Content-Type", product.photo.contentType);
  return res.send(product.photo.data);
};

//! update product (norml code)
/* export const updateProduct = async (req, res) => {
  try {
    //* getting info from frontend
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
    if (
      !name ||
      !description ||
      !price ||
      !collection ||
      !quantity ||
      !shipping ||
      !stock ||
      !sold
    ) {
      return res
        .status(400)
        .json({ success: false, message: "required filedds missing" });
    }
    //* edit product
    const editproduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true },
    );
    if (photo) {
      editproduct.photo.data = fs.readFileSync(photo.path);
      editproduct.photo.contentType = photo.type;
    }
    await editproduct.save();
    res.status(201).json({
      success: true,
      message: `product updated successfully`,
      editproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in updating product ${error}`,
      error,
    });
  }
}; */

//! update product (cgpt code 2)
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

    const { photo } = req.files || {};

    if (
      !name ||
      !description ||
      !collection ||
      price === undefined ||
      quantity === undefined ||
      stock === undefined ||
      sold === undefined ||
      shipping === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    product.name = name;
    product.slug = slugify(name, { lower: true });
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.stock = stock;
    product.sold = sold;
    product.shipping = shipping === "1";
    product.collection = collection;

    if (photo) {
      product.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

//! update product (cgpt code 1)workd lst
/* export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      shipping,
      collection,
      stock,
      sold,
    } = req.fields;

    const { photo } = req.files || {};

    //* basic validation
    if (
      !name ||
      !description ||
      !collection ||
      price === undefined ||
      quantity === undefined ||
      shipping === undefined ||
      stock === undefined ||
      sold === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "required fileds are missing",
      });
    }

    //* edit product
    const editProduct = await Product.findById(req.params.id);
    if (!editProduct)
      return res.status(404).json({
        success: false,
        message: "product not found",
      });

    //* update fileds
    editProduct.name = name;
    editProduct.slug = slugify(name);
    editProduct.description = description;
    editProduct.price = price;
    editProduct.quantity = quantity;
    editProduct.shipping = shipping === 1;
    editProduct.stock = stock;
    editProduct.sold = sold;
    editProduct.collection = collection;

    //* update photo
    if (photo) {
      editProduct.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type || photo.mimetype,
      };
    }

    await editProduct.save();

    console.log(req.fields);
    console.log(req.files);

    res.status(200).json({
      success: true,
      message: "product updated successfully",
      editProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in updating product ${error}`,
      error,
    });
  }
}; */

//! delete product (nomrl code) wrking
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id).select("-photo");
    res.status(201).json({
      success: true,
      message: `Product deleted successfully`,
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

//! delete product (cgpt code 1)
/* export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
}; */

//! product filter
export const productFilter = async (req, res) => {
  try {
    //* norml code
    /* {
    const { checked, radio } = request.body;
    // we are getting the filter from the frontend and saving it in an object
    let args = {};
    // here we are using the theory from mongodb
    // gte (greater than or equal to)
    // lte (lesser than or equal to)
    // if collection is selected save to args if price is selected its ranges added to args
    if (checked.length > 0) args.collection = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const product = await Product.find(args);
    res.status(200).send({
      success: true,
      product,
    }); */
    //* cgpt code
    const { checked, radio } = req.body;

    let args = {};

    if (checked?.length > 0) {
      args.collection = { $in: checked };
    }

    if (radio?.length === 2) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await Product.find(args).select("-photo");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in product filtering functionality ${error}`,
      error,
    });
  }
};

//! product count
export const productCount = async (req, res) => {
  try {
    //* norml code
    /* {
    const total = await Product.find({}.estimatedDocumentCount());
    res.status(200).json({
      success: true,
      total,
    }); */
    //* cgpt code
    const total = await Product.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `error in product count functionality ${error}`,
      error,
    });
  }
};

//! product list-pagination (norml code) wrkng
// (base on a page)
export const productList = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await Product
      //* Fetches documents from the collection.
      // {} means no filter, so it returns all products.
      // Same as: “give me every product”
      .find({})
      //* Controls which fields are included or excluded.
      // -photo means exclude the photo field from the result.
      // Useful when photo is large (like image data) and you don’t want to send it every time.
      .select("-photo")
      //* Skips a certain number of documents
      // Used for pagination
      .skip((page - 1) * perPage)
      //* Limits the number of documents returned
      .limit(perPage)
      //* Sorts the result
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in product list, error in per page ctrl, pagination ${error}`,
      error,
    });
  }
};

//! product list-pagination (cgpt code 1)
/* export const productList = async (req, res) => {
  try {
    const perPage = 6;
    const page = Number(req.params.page) || 1;

    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
}; */

//! search products
export const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;

    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    })
      /* .select("-photo"); */
      .select("name description price slug");

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "error in search product functionality",
      error,
    });
  }
};

//! similar products
// (while searching)
export const similarProduct = async (req, rea) => {
  try {
    const { pid, cid } = req.params;

    const products = await Product.find({
      collection: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("collection");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "error in similar products functionality",
      error,
    });
  }
};

//! products by collection
// (product-related logic)
export const getProductsByCollection = async (req, res) => {
  try {
    const { slug } = req.params;

    // find collection by slug
    const collection = await Collection.findOne({
      slug: slug.toLowerCase(), // ✅ FIX
    });

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    // find products of that collection
    const products = await Product.find({ collection: collection._id })

      .populate("collection")
      .select("-photo");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `error in products by collection functionality ${error}`,
      error,
    });
  }
};
