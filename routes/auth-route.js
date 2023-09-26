import express from "express";
import { signin,signup } from "../controllers/auth-controller.js";
import { signinDetailsChecking, signupDetailsChecking } from "../middleware/check-details.js";

const router=express.Router();

router.post("/signup",signupDetailsChecking,signup);

router.post("/signin",signinDetailsChecking,signin);

export default router;