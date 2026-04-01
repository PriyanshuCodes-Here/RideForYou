import express from 'express';
import { 
  registerUser, 
  loginUser, 
  verifyEmail, 
  saveBus 
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify/:token', verifyEmail); 
router.post('/save-bus', protect, saveBus);

export default router;