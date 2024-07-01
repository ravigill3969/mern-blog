import express from "express";
import { testreq, verifyToken } from "../utils/verifyUser.js";
import { create } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", verifyToken, create);

export default router;
