import { Router } from "express";
import { signupUser, loginUser } from "../controller/userController.js";

const router = Router();

// @route   POST /api/users/signup
router.post("/signup", signupUser);

// @route   POST /api/users/login
router.post("/login", loginUser);

export default router;
