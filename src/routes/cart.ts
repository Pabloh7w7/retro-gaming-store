import { Router } from 'express';
import { addToCart, getCartItems, removeCartItem } from '../controllers/cartcontroller';

const router = Router();

router.post('/', addToCart);
router.get('/', getCartItems);
router.delete('/:id', removeCartItem);

export default router;