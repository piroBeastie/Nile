import express from "express"
import { register, login, logout } from "../controllers/auth.controller.js"
import { validateRegister, validateLogin } from "../middleware/auth.middleware.js"
import { checkAuth } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/register", validateRegister, register)
router.post("/login", validateLogin, login)
router.post("/logout", logout);
router.get("/check", protect, checkAuth);

export default router;