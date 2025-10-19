import { Request, Response } from 'express';
import { pool } from '../config/db';

export const createOrder = async (req: Request, res: Response) => {
  const user_id = req.user?.id;

  try {
    const conn = await pool.getConnection();

    const [cartItems] = await conn.query(
      'SELECT product_id, quantity FROM cart_items WHERE user_id = ?',
      [user_id]
    );

    if ((cartItems as any[]).length === 0) {
      conn.release();
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    const [orderResult] = await conn.query(
      'INSERT INTO orders (user_id) VALUES (?)',
      [user_id]
    );
    const order_id = (orderResult as any).insertId;

    for (const item of cartItems as any[]) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)',
        [order_id, item.product_id, item.quantity]
      );
    }

    await conn.query('DELETE FROM cart_items WHERE user_id = ?', [user_id]);

    conn.release();
    res.status(201).json({ message: 'Compra realizada con éxito', order_id });
  } catch (err) {
    console.error('Error al crear la orden:', err);
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
};