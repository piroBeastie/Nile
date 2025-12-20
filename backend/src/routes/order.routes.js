import express from "express";

import { postOrder, getOrder, updateOrderStatus, getAllOrders } from "../controllers/order.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";
import { validateOrder } from "../middleware/order.middleware.js";

const router = express.Router();

router.post('/', protect, validateOrder, postOrder);
router.get('/:id', protect, getOrder);

router.post('/:id', protect, admin, updateOrderStatus)
router.get('/all', protect, admin, getAllOrders)

export default router;