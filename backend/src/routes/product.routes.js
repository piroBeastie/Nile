import express from "express"
import { getProducts,getProduct,postProducts,putProducts,deleteProducts } from "../controllers/product.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";
import { validateProduct } from "../middleware/product.middleware.js";

const router = express.Router();

router.get('/',getProducts)
router.get('/:id',getProduct)

router.post('/', protect, admin, validateProduct, postProducts)
router.put('/:id', protect, admin, validateProduct, putProducts)
router.delete('/:id', protect, admin, deleteProducts)

export default router 