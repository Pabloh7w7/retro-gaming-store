import { Request, Response } from 'express';
import { pool } from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET no está definido');
  }

  try {
    const conn = await pool.getConnection();
    const [user] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
    conn.release();

    if (!user || (user as any[]).length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, (user as any[])[0].password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: (user as any[])[0].id, username: (user as any[])[0].username },
      secret,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: (user as any[])[0].id,
        username: (user as any[])[0].username,
        email: (user as any[])[0].email
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET no está definido');
  }

  try {
    const conn = await pool.getConnection();

    const [existing] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
    if ((existing as any[]).length > 0) {
      conn.release();
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await conn.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    conn.release();

    const token = jwt.sign({ username, email }, secret, { expiresIn: '2h' });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: { username, email }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};