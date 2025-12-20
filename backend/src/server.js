import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import orderRoutes from "./routes/order.routes.js"
import authRoutes from "./routes/auth.routes.js"
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server is working at: http://localhost:` + PORT)
})

app.use(express.json());
app.use(cookieParser())

app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("./auth", authRoutes);