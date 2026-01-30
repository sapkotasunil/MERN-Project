import {
  addOrders,
  getAllOrders,
  getUserOrders,
} from "../controllers/orders.controller.js";

import express from "express";
import checkAuth from "../middlewares/checkauth.middleware.js";
import checkAdmin from "../middlewares/checkAdmin.middleware.js";

const router = express.Router();
router.post("/", checkAuth, addOrders);
router.get("/userorders", checkAuth, getUserOrders);
router.get("/allorders", checkAuth, checkAdmin, getAllOrders);

export default router;
