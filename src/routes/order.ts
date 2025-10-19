import express from 'express';
import { createOrder } from '../controllers/createorder';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

// Esta es la ruta de checkout
router.post('/checkout', verifyToken, createOrder);

export default router;