import express from "express";
import {
  addProduct,
  getProductById,
  getProducts,
} from "../controllers/product.controller.js";
import checkAuth from "../middlewares/checkauth.middleware.js";
import checkAdmin from "../middlewares/checkAdmin.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", checkAuth, checkAdmin, addProduct);
router.get("/:id", getProductById);

export default router;
