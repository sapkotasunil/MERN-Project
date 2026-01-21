import express from "express";
import {
  addProduct,
  getProductById,
  getProducts,
} from "../controllers/product.controller.js";
import checkAuth from "../middlewares/checkauth.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", checkAuth, addProduct);
router.get("/:id", getProductById);

export default router;
