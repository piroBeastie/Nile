import dotenv from "dotenv"
dotenv.config();

import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";

import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import orderRoutes from "./routes/order.routes.js"
import authRoutes from "./routes/auth.routes.js"
import paymentRoutes from "./routes/payment.routes.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server is working at: http://localhost:` + PORT)
})




