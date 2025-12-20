import express from "express"
import { getCart, postCart, putCart, deleteCart } from "../controllers/cart.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/', protect, getCart)
router.post('/', protect, postCart)
router.put('/:id', protect, putCart)
router.delete('/:id', protect, deleteCart)

export default router