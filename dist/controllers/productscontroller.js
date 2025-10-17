"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getAllProducts = void 0;
const db_1 = require("../config/db");
const getAllProducts = async (_req, res) => {
    try {
        const conn = await db_1.pool.getConnection();
        const rows = await conn.query('SELECT * FROM products');
        conn.release();
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};
exports.getAllProducts = getAllProducts;
const createProduct = async (req, res) => {
    const { name, description, price, image_url, category } = req.body;
    try {
        const conn = await db_1.pool.getConnection();
        const result = await conn.query('INSERT INTO products (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)', [name, description, price, image_url, category]);
        conn.release();
        res.status(201).json({ id: Number(result.insertId), name, description, price, image_url, category });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear producto' });
    }
};
exports.createProduct = createProduct;
//# sourceMappingURL=productscontroller.js.map