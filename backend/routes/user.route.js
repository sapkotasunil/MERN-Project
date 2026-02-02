import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
  userUpdate,
} from "../controllers/user.controller.js";
import checkAuth from "../middlewares/checkauth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", checkAuth, logout);
router.put("/updateprofile", checkAuth, userUpdate);
router.get("/profile", checkAuth, getProfile);

export default router;
