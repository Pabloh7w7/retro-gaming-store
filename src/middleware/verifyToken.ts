import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return res.status(500).json({ error: 'Error interno de autenticación' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === 'object' && 'id' in decoded) {
      req.user = decoded as JwtPayload;
      next();
    } else {
      return res.status(401).json({ error: 'Token inválido' });
    }
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};