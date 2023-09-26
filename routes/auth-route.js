import express from "express";
import { logout, signin, signup } from "../controllers/auth-controller.js";
import { signinDetailsChecking, signupDetailsChecking } from "../middleware/check-details.js";
import { verifyToken } from "../middleware/verify-token.js";

const router = express.Router();

router.post("/signup", signupDetailsChecking, signup);

router.post("/signin", signinDetailsChecking, signin);

router.get("/logout", verifyToken, logout);

export default router;