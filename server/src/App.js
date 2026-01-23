import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/AuthRoutes.js";
import CollectionRoutes from "./routes/CollectionRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
/* import crypto from "crypto"; */

const app = express();

//! middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//! routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/collection", CollectionRoutes);
app.use("/api/v1/product", ProductRoutes);

//! generate secret key
/* const Key = crypto.randomBytes(64).toString("hex");
console.log(Key); */

app.get("/", (req, res) => {
  res.send("<h1>hello world e-commerce web-app is work in progress.</h1>");
});

export default app;
