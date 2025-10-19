import { Router } from 'express';
import { addToCart, getCartItems, removeCartItem } from '../controllers/cartcontroller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.post('/', addToCart);
router.get('/', getCartItems);
router.delete('/:id', removeCartItem);
router.get('/', verifyToken, getCartItems);
router.post('/', verifyToken, addToCart);

export default router;