import express from "express";
import blogController from "../controllers/blog.js";
import { verifyUser, verifyAdmin } from "../utils/auth.js";

const router = express.Router();

//user
router.get('/', verifyUser, blogController.getAllBlogs);

router.get('/:blogId', verifyUser, blogController.getBlog);

router.post('/add', verifyUser, blogController.postBlog);

router.patch('/update/:blogId', verifyUser, blogController.updateBlog);

//comments
router.post('/comments/add', verifyUser, blogController.addComment);

router.delete('/comments/remove', verifyUser, verifyAdmin, blogController.removeComment);

//admin
router.delete('/delete', verifyUser, verifyAdmin, blogController.deleteBlog);

export default router;
