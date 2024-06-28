import express from "express";
import { test, update } from "../controllers/user.controller.js";
import { test as t,verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", t,verifyToken, update);

export default router;
