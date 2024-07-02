import express from "express";
import { testreq, verifyToken } from "../utils/verifyUser.js";
import { create, getposts } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", verifyToken, create);
router.get("/getposts", testreq, getposts);


export default router;
