"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productscontroller_1 = require("../controllers/productscontroller");
const router = (0, express_1.Router)();
router.get('/', productscontroller_1.getAllProducts);
router.post('/', productscontroller_1.createProduct);
exports.default = router;
//# sourceMappingURL=products.js.map