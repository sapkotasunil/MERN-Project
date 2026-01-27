import express from "express";
import {
  addProduct,
  addReview,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import checkAuth from "../middlewares/checkauth.middleware.js";
import checkAdmin from "../middlewares/checkAdmin.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", checkAuth, checkAdmin, addProduct);
router.get("/:id", getProductById);
router.post("/:id/addreview", checkAuth, addReview);
router.put("/:id", checkAuth, checkAdmin, updateProduct);
router.delete("/:id", checkAuth, checkAdmin, deleteProduct);

export default router;
