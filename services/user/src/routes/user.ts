import express from 'express'
import { getMe, getUserProfile, loginUser, updateUserProfile } from '../controllers/user.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();
router.post('/login', loginUser);
router.get('/me',isAuth,getMe);
router.get('/getUser/:id',isAuth, getUserProfile);
router.post('/update',isAuth, updateUserProfile);

export default router;
