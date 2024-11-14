import express from 'express';
import { registerUser, loginUser } from '../controller/user.controller.js';

const router = express.Router();
// api/v1/auth/register
router.post('/register', registerUser);

// api/v1/auth/login
router.post('/login', loginUser);

export default router;
