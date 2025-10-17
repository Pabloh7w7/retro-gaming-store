import { pool } from './config/db';

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT 1 AS test');
    console.log('Conexión exitosa:', rows);
    conn.release();
  } catch (err) {
    console.error('Error de conexión:', err);
  }
}

testConnection();