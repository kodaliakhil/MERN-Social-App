import express from "express";
import { createPost, deletePost, getFeedPosts, getPost, likeUnlikePost, replyToPost } from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

router.get("/feed",protectRoute, getFeedPosts);
router.get("/getPost/:id", getPost);
router.post("/create",protectRoute, createPost);
router.delete("/delPost/:id",protectRoute, deletePost);
router.post("/like/:id",protectRoute, likeUnlikePost);
router.post("/reply/:id",protectRoute, replyToPost);

export default router;
