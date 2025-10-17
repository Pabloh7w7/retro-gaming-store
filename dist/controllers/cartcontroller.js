"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCartItem = exports.getCartItems = exports.addToCart = void 0;
const db_1 = require("../config/db");
const addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    try {
        const conn = await db_1.pool.getConnection();
        const result = await conn.query('INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)', [product_id, quantity]);
        conn.release();
        res.status(201).json({
            id: Number(result.insertId),
            product_id,
            quantity
        });
    }
    catch (err) {
        console.error('Error al agregar al carrito:', err);
        res.status(500).json({ error: 'Error al agregar al carrito' });
    }
};
exports.addToCart = addToCart;
const getCartItems = async (_req, res) => {
    try {
        const conn = await db_1.pool.getConnection();
        const rows = await conn.query(`
      SELECT ci.id, p.name, p.price, ci.quantity, (p.price * ci.quantity) AS subtotal
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
    `);
        conn.release();
        res.json(rows);
    }
    catch (err) {
        console.error('Error al obtener el carrito:', err);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
};
exports.getCartItems = getCartItems;
const removeCartItem = async (req, res) => {
    const { id } = req.params;
    try {
        const conn = await db_1.pool.getConnection();
        await conn.query('DELETE FROM cart_items WHERE id = ?', [id]);
        conn.release();
        res.json({ message: 'Producto eliminado del carrito' });
    }
    catch (err) {
        console.error('Error al eliminar del carrito:', err);
        res.status(500).json({ error: 'Error al eliminar del carrito' });
    }
};
exports.removeCartItem = removeCartItem;
//# sourceMappingURL=cartcontroller.js.map