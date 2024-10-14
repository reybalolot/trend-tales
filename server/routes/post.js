import express from "express";
import postController from "../controllers/post.js";
import { verifyUser, verifyAdmin } from "../utils/auth.js";

const router = express.Router();

//user
router.get('/featured', postController.getAggregatePosts);

router.get('/', verifyUser, postController.getAllPosts);

router.get('/:postId', verifyUser, postController.getPost);

router.post('/add', verifyUser, postController.createPost);

router.patch('/update/:postId', verifyUser, postController.updatePost);

//comments
router.get('/:postId/comments/', verifyUser, postController.getComments);

router.post('/:postId/comments/add', verifyUser, postController.addComment);

router.delete('/comments/remove/:commentId', verifyUser, verifyAdmin, postController.removeComment);

//admin
router.delete('/delete/:postId', verifyUser, verifyAdmin, postController.deletePost);

export default router;
