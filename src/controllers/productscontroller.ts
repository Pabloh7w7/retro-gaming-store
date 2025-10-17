import { Request, Response } from 'express';
import { pool } from '../config/db';
import { Product } from '../models/product';

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM products');
    conn.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, image_url, category }: Product = req.body;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO products (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, image_url, category]
    );
    conn.release();
    res.status(201).json({ id: Number(result.insertId), name, description, price, image_url, category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};