import express from "express";
import { test, update, deleteUser,getusers } from "../controllers/user.controller.js";
import { testreq as t, verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", t, verifyToken, update);
router.delete("/delete/:userId", t, verifyToken, deleteUser);
router.get('/getusers', verifyToken, getusers)

export default router;
