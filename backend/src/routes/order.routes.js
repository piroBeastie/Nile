import express from "express";

import { postOrder, getOrderById, getOrder, putPay, putDeliver, getAllOrders } from "../controllers/order.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/', protect, postOrder);

router.get("/all", protect, admin, getAllOrders);
router.get('/', protect, getOrder)

router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, putPay)
router.put('/:id/deliver', protect, admin, putDeliver)


export default router;