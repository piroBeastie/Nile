import express from "express";

import { createOrderAfterPayment, getOrderById, getOrder, getAllOrders } from "../controllers/order.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-after-payment", protect, createOrderAfterPayment);

router.get("/all", protect, admin, getAllOrders);
router.get('/', protect, getOrder)

router.get('/:id', protect, getOrderById);

export default router;