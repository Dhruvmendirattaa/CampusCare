import { Router } from "express";
import { signupUser, loginUser } from "../controller/userController.js";
const router = Router();

// POST /api/users/signup
router.post("/signup", signupUser);

// POST /api/users/login
router.post("/login", loginUser);

export default router;