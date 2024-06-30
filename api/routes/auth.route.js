import express from "express";
import { signup, signin, google } from "../controllers/auth.controller.js";
import { testreq } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup",testreq, signup);
router.post("/signin",testreq, signin);
router.post("/google",testreq, google);


export default router;
