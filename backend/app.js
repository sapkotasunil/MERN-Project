import express from "express";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cookieParser from "cookie-parser";
import orderRouter from "./routes/order.route.js";
import UploadRouter from "./routes/uploads.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/upload", UploadRouter);
app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);
app.use("/api/order", orderRouter);
export default app;
