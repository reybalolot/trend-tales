import express from "express";
import userController from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../utils/auth.js";

const router = express.Router();

//user
router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/logout', userController.logoutUser);

router.get('/', verifyUser, userController.getUserDetails);

router.patch('/update-password', verifyUser, userController.updateUserPassword);

//admin
router.patch('/set-admin/:userId', verifyUser, verifyAdmin, userController.setUserAdmin);

export default router;
