import { Request, Response } from 'express';
import { pool } from '../config/db';
import { CartItem } from '../models/cartItem';

export const addToCart = async (req: Request, res: Response) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user?.id;

  try {
    const conn = await pool.getConnection();
    await conn.query(
      'INSERT INTO cart_items (product_id, quantity, user_id) VALUES (?, ?, ?)',
      [product_id, quantity, user_id]
    );
    conn.release();
    res.status(201).json({ message: 'Producto agregado al carrito' });
  } catch (err) {
    console.error('Error al agregar al carrito:', err);
    res.status(500).json({ error: 'Error al agregar al carrito' });
  }
};

export const getCartItems = async (req: Request, res: Response) => {
  const user_id = req.user?.id;

  try {
    const conn = await pool.getConnection();
    const [items] = await conn.query(
      'SELECT * FROM cart_items WHERE user_id = ?',
      [user_id]
    );
    conn.release();
    res.json(items);
  } catch (err) {
    console.error('Error al obtener el carrito:', err);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    await conn.query('DELETE FROM cart_items WHERE id = ?', [id]);
    conn.release();
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (err) {
    console.error('Error al eliminar del carrito:', err);
    res.status(500).json({ error: 'Error al eliminar del carrito' });
  }
};