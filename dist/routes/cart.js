"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartcontroller_1 = require("../controllers/cartcontroller");
const router = (0, express_1.Router)();
router.post('/', cartcontroller_1.addToCart);
router.get('/', cartcontroller_1.getCartItems);
router.delete('/:id', cartcontroller_1.removeCartItem);
exports.default = router;
//# sourceMappingURL=cart.js.map