import express from 'express'
import { getMe, getUserProfile, loginUser, updateProfilePicture, updateUserProfile } from '../controllers/user.js';
import { isAuth } from '../middleware/isAuth.js';
import uploadfile from '../middleware/multer.js';

const router = express.Router();
router.post('/login', loginUser);
router.get('/me',isAuth,getMe);
router.get('/getUser/:id',isAuth, getUserProfile);
router.post('/update',isAuth, updateUserProfile);
router.post("/update/pic", isAuth, uploadfile, updateProfilePicture);

export default router;
