import {
  addOrders,
  deliverOrder,
  getAllOrders,
  getOrderByid,
  getUserOrders,
  payOrder,
} from "../controllers/orders.controller.js";

import express from "express";
import checkAuth from "../middlewares/checkauth.middleware.js";
import checkAdmin from "../middlewares/checkAdmin.middleware.js";

const router = express.Router();
router.post("/", checkAuth, addOrders);
router.get("/", checkAuth, checkAdmin, getAllOrders);
router.get("/myorders", checkAuth, getUserOrders);
router.get("/:id", checkAuth, getOrderByid);
router.put("/:id/pay", checkAuth, payOrder);
router.put("/:id/deliver", checkAuth, checkAdmin, deliverOrder);

export default router;
